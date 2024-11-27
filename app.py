import os
import logging
import warnings
from dotenv import load_dotenv
from flask import Flask, request, jsonify
from flask_cors import CORS
from langchain.prompts import PromptTemplate
from langchain_openai import OpenAIEmbeddings
from langchain_pinecone import PineconeVectorStore
from langchain.chains import ConversationalRetrievalChain
from langchain_community.chat_models import ChatOpenAI
from langchain.memory import ConversationBufferMemory
from langchain.schema import HumanMessage, AIMessage

load_dotenv()

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

if not os.getenv("OPENAI_API_KEY") or not os.getenv("INDEX_NAME"):
    raise ValueError(
        "Missing required environment variables: OPENAI_API_KEY or INDEX_NAME")

app = Flask(__name__)
CORS(app)

open_api_key = os.getenv("OPENAI_API_KEY")
index_name = os.getenv("INDEX_NAME")

warnings.filterwarnings("ignore")

chat = ChatOpenAI(verbose=True, temperature=0, model_name="gpt-3.5-turbo")
embeddings = OpenAIEmbeddings()
vectorstore = PineconeVectorStore(index_name=index_name, embedding=embeddings)

rag_prompt = PromptTemplate(
    input_variables=["question", "chat_history", "context"],
    template=(
        "You are Sujith, and you speak in the first person. Respond to the user with specific and concise answers. "
        "using the provided context and the chat history. If a follow-up question is asked, ensure your response aligns with prior exchanges. "
        "If the answer is not in the context, say 'I don't know, but I will get back to you.' "
        "based on the provided context, if there is no explicit mention, say I will check with Sujith my creator and get back to you."
        "Do not use any external information.\n\n"
        "Chat History:\n{chat_history}\n"
        "Context:\n{context}\n"
        "Question: {question}\n"
        "Your response:"
    ),
)

qa_chain_with_memory = ConversationalRetrievalChain.from_llm(
    llm=chat, retriever=vectorstore.as_retriever(), memory=None)

# Dictionary to store chat histories with session IDs
chat_histories = {}

def custom_qa(question, chat_history, max_history_length=5):
    try:
        formatted_chat_history = "\n".join(
            f"Q: {q}\nA: {a}" for q, a in
            chat_history[-max_history_length:]) if chat_history else ""
        retriever = vectorstore.as_retriever()
        docs = retriever.get_relevant_documents(question)
        context = "\n".join([doc.page_content for doc in docs])
        prompt = rag_prompt.format(question=question,
                                   chat_history=formatted_chat_history,
                                   context=context)
        memory = ConversationBufferMemory(memory_key="chat_history",
                                          return_messages=True)
        memory.chat_memory.messages = [
            msg for q, a in chat_history
            for msg in [HumanMessage(
                content=q), AIMessage(content=a)]
        ]

        qa_chain_with_memory.memory = memory
        response = qa_chain_with_memory({"question": prompt})
        answer = response['answer']

        return answer

    except Exception as e:
        logger.error(f"Error in custom_qa: {e}")
        return "An error occurred while processing your request. Please try again later."

@app.route('/chat', methods=['GET'])
def chat_endpoint():
    try:
        session_id = request.args.get('session_id')
        if not session_id:
            return jsonify({"error": "Session ID parameter is required"}), 400

        question = request.args.get('question')
        if not question:
            return jsonify({"error": "Question parameter is required"}), 400

        chat_history = chat_histories.get(session_id, [])
        answer = custom_qa(question, chat_history)
        chat_history.append([question, answer])
        chat_histories[session_id] = chat_history

        return jsonify({"answer": answer, "chat_history": chat_history})

    except Exception as e:
        logger.error(f"Error in chat endpoint: {e}")
        return jsonify({"error": "An internal server error occurred"}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3000)
