from langchain.chat_models import AzureChatOpenAI
from app.utils.config_loader import load_config


def get_langchain_llm():
    config=load_config()
    azure_config=config["azure_openai"]

    llm=AzureChatOpenAI(
        openai_api_version=azure_config["api_version"],
        deployment_name=azure_config["deployment_name"],
        openai_api_base=azure_config["api_base"],
        openai_api_key=azure_config["api_key"]
    )
    return llm
