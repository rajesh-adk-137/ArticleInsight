from fastapi import FastAPI, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from bs4 import BeautifulSoup
import requests
from llmware.models import ModelCatalog
from typing import Optional
import io
import sys

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)



def scrape_dev_article(url):
    response = requests.get(url)
    if response.status_code == 200:
        soup = BeautifulSoup(response.content, 'html.parser')
        title_tag = soup.find('h1')
        title = title_tag.get_text() if title_tag else 'No title found'

        content_div = soup.find('div', class_='crayons-article__main')
        paragraphs = content_div.find_all('p') if content_div else []
        content = ''
        for paragraph in paragraphs:
            content += paragraph.get_text() + '\n\n'

        comments_divs = soup.find_all('div', class_='comment__body')
        comments = ''
        for comment_div in comments_divs:
            comments += comment_div.get_text() + '\n\n'

        likes = 'Likes information not extracted'

        lines = content.splitlines()
        filtered_lines = []

        remove_words_first_20 = ["Sign up", "Sign in", "Follow", "Listen", "Share"]
        remove_words_last_25 = [
            "--", "Building. Author of “Feeling Great About My Butt.” Previously: Creators @Medium, Product @embedly, Research @NECSI. http://whichlight.com.",
            "Help", "Status", "About", "Careers", "Press", "Blog", "Privacy", "Terms", "Text to speech", "Teams"
        ]

        for i, line in enumerate(lines):
            if i < 20 and any(word in line for word in remove_words_first_20):
                continue
            filtered_lines.append(line)

        final_filtered_lines = []
        for i, line in enumerate(filtered_lines):
            if i >= len(filtered_lines) - 25 and any(word in line for word in remove_words_last_25):
                continue
            final_filtered_lines.append(line)

        filtered_content = '\n'.join(final_filtered_lines)

        return title, filtered_content, comments, likes
    else:
        return None, f'Error: Unable to fetch the article. Status code: {response.status_code}', '', ''

def get_summary(text):
    if text is not None:
        slim_model = ModelCatalog().load_model("slim-summary-tool")
        response = slim_model.function_call(text, params="[key points (3)]", function="summarize")
        return response["llm_response"]
    else:
        return "Invalid text"

def get_tags(text):
    if text is not None:
        slim_model = ModelCatalog().load_model("slim-tags-tool")
        response = slim_model.function_call(text, params=["tags"], function="classify")
        return response["llm_response"]
    else:
        return "Invalid text"

def get_sentiment(comments):
    if comments is not None:
        slim_model = ModelCatalog().load_model("slim-sentiment-tool")
        response = slim_model.function_call(comments, params=["sentiment"], function="classify")
        return response["llm_response"]
    else:
        return "Invalid text"

def get_topic(text):
    if text is not None:
        slim_model = ModelCatalog().load_model("slim-topics-tool")
        response = slim_model.function_call(text, params=["topics"], function="classify")
        return response["llm_response"]
    else:
        return "Invalid text"

def get_answer(text, question):
    if text is not None:
        questions = '"' + question + " (explain)" + '"' # necessary to get explanation as well
        slim_model = ModelCatalog().load_model("slim-boolean-tool")
        response = slim_model.function_call(text, params=[questions], function="boolean")
        return response["llm_response"]
    else:
        return "Invalid text"

@app.post("/get_all/")
async def get_all(url: str = Form(...)):
    title, content, comments, likes = scrape_dev_article(url)

    if title:
        text = '"' + content + '"'

        summary = get_summary(text)
        tags = get_tags(text)
        sentiment = get_sentiment(comments)
        topic = get_topic(text)

        return JSONResponse({"summary": summary, "tags": tags, "sentiment": sentiment, "topic": topic})
    else:
        raise HTTPException(status_code=400, detail="Error scraping the article.")

@app.post("/get_answer/")
async def get_answer_route(url: str = Form(...), question: str = Form(...)):
    title, content, comments, likes = scrape_dev_article(url)

    if title:
        text = '"' + content + '"'

        if not question:
            raise HTTPException(status_code=400, detail="Question parameter is required for get_answer function")

        answer = get_answer(text, question)
        return JSONResponse({"answer": answer})
    else:
        raise HTTPException(status_code=400, detail="Error scraping the article.")
