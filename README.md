

---
# ArticleInsight: Your AI-Powered Article Analysis Tool
<p align="center">
<p align="center">
<a href="https://github.com/rajesh-adk-137/ArticleInsight/" target="blank">
<img src="https://img.shields.io/github/watchers/rajesh-adk-137/ArticleInsight?style=for-the-badge&logo=appveyor" alt="Watchers"/>
</a>
<a href="https://github.com/rajesh-adk-137/ArticleInsight/fork" target="blank">
<img src="https://img.shields.io/github/forks/rajesh-adk-137/ArticleInsight?style=for-the-badge&logo=appveyor" alt="Forks"/>
</a>
<a href="https://github.com/rajesh-adk-137/ArticleInsight/stargazers" target="blank">
<img src="https://img.shields.io/github/stars/rajesh-adk-137/ArticleInsight?style=for-the-badge&logo=appveyor" alt="Star"/>
</a>
</p>
<p align="center">
<a href="https://github.com/rajesh-adk-137/ArticleInsight/issues" target="blank">
<img src="https://img.shields.io/github/issues/rajesh-adk-137/ArticleInsight?style=for-the-badge&logo=appveyor" alt="Issue"/>
</a>
<a href="https://github.com/rajesh-adk-137/ArticleInsight/pulls" target="blank">
<img src="https://img.shields.io/github/issues-pr/rajesh-adk-137/ArticleInsight?style=for-the-badge&logo=appveyor" alt="Open Pull Request"/>
</a>
</p>
<p align="center">
<a href="https://github.com/rajesh-adk-137/ArticleInsight/blob/master/LICENSE" target="blank">
<img src="https://img.shields.io/github/license/rajesh-adk-137/ArticleInsight?style=for-the-badge&logo=appveyor" alt="License" />
</a>
</p>
</p>

ArticleInsight is a powerful web application designed to provide deep insights and comprehensive analysis of articles. Leveraging state-of-the-art AI models from LLMWare, ArticleInsight offers functionalities such as generating summaries, creating tags, categorizing content, performing sentiment analysis on comments, and answering questions about the article. It responds to the urls from dev.to and medium.

## Features

- **Article Summarization**: Generate concise and comprehensive summaries of articles.
- **Tag Generation**: Automatically generate relevant tags to enhance article discoverability.
- **Content Categorization**: Classify articles into appropriate categories.
- **Sentiment Analysis**: Analyze comments to determine the overall sentiment.
- **Question Answering**: Get precise answers to questions related to the article content.

## Demo
<video src="https://github.com/rajesh-adk-137/ArticleInsight/assets/89499267/0b966113-b33c-455d-bc73-ead668c8fc96
"></video>

## Dependencies
- React
- Yarn
- FastAPI
- Python
- LLMWare models

## Getting Started

### Installation

#### Clone the repository:
```bash
git clone https://github.com/rajesh-adk-137/ArticleInsight.git
```
#### Go to the repository:
```bash
cd ArticleInsight
```

### Frontend Setup

#### Navigate to the frontend directory:
```bash
cd frontend
```

#### Install dependencies:
```bash
yarn install
```

#### Start the development server:
```bash
yarn run dev
```

### Backend Setup

#### Navigate to the backend directory:
```bash
cd ../backend
```

#### Set up a virtual environment (recommended):
```bash
python -m venv env
source env/bin/activate  # On Windows use `env\Scripts\activate`
```

#### Install dependencies:
```bash
pip install -r requirements.txt
```

**Note**: The initial setup might take some time as it involves downloading five models.

#### Start the API server:
```bash
uvicorn api_article:app --reload
```

## Usage

#### Visit the frontend application:
Open your browser and navigate to `http://localhost:5173`.

#### Make sure the backend is running at:
`http://localhost:8000`.

## Screenshots
Landing Page:
![Landing](https://github.com/rajesh-adk-137/ArticleInsight/assets/89499267/28c917da-6f80-4bba-b287-ef8440fc6fdb)
Home Page:
![Home](https://github.com/rajesh-adk-137/ArticleInsight/assets/89499267/d0d1cfbf-4402-405c-9849-4244f571d264)
ArticleInsight-1:
![ArticleInsight-1](https://github.com/rajesh-adk-137/ArticleInsight/assets/89499267/9121a262-0900-4b22-9dbb-06603c157a9d)
ArticleInsight-2:
![ArticleInsight-2](https://github.com/rajesh-adk-137/ArticleInsight/assets/89499267/ac450183-c3ed-44b5-a28a-e5f90912336b)
About Section:
![About](https://github.com/rajesh-adk-137/ArticleInsight/assets/89499267/1790c9e0-b10d-4f67-9f48-cb9518f3e315)


## Contributing

We welcome contributions from the community! If you'd like to contribute to ArticleInsight, please follow these steps:

1. **Fork the Repository**: Click the "Fork" button on GitHub to create your copy.

2. **Clone Your Fork**:
   ```bash
   git clone https://github.com/yourusername/ArticleInsight.git
   ```

3. **Create a Branch**:
   ```bash
   git checkout -b your-branch-name
   ```

4. **Make Changes**: Implement your changes.

5. **Commit Your Changes**:
   ```bash
   git commit -m "Description of your changes"
   ```

6. **Push Your Changes**:
   ```bash
   git push -u origin your-branch-name
   ```

7. **Create a Pull Request**: Submit your changes for review.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgments

- [LLMWare](https://www.llmware.ai/) for their powerful AI models
- [React](https://reactjs.org/) for the amazing JavaScript library
- [Yarn](https://yarnpkg.com/) for the reliable package manager
- [FastAPI](https://fastapi.tiangolo.com/) for the fast and efficient web framework
- [Python](https://www.python.org/) for the versatile programming language

---


