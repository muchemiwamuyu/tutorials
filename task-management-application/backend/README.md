# Task Management Application - Backend

This is a simple **FastAPI** backend application built to manage and store task data, designed to grow iteratively with new enhancements over time.

## Features

The initial version focuses on core task management functionality, with plans to expand as the application matures:

- **CRUD Operations:** Create, Read, Update, and Delete tasks.

## Project Setup & Installation

Follow these steps from the `backend/` root directory to set up your local development environment.

### 1. Create and Activate a Virtual Environment

```bash
python -m venv virtual
```

* **Windows (Command Prompt):**
  ```bash
  virtual\Scripts\activate
  ```
* **Windows (Git Bash):**
  ```bash
  source virtual/Scripts/activate
  ```
* **Linux / macOS:**
  ```bash
  source virtual/bin/activate
  ```

### 2. Install Dependencies

Choose one of the following options depending on your dependency file:

* **Using `pyproject.toml` (with `pip`):**
  ```bash
  pip install -e .
  ```
* **Using `pyproject.toml` (with `uv`):**
  ```bash
  uv sync
  ```
* **Using `requirements.txt`:**
  ```bash
  pip install -r requirements.txt
  ```

### 3. Run the Application

Start the FastAPI development server with auto-reload enabled:

```bash
fastapi dev src/main.py
```

Once running, the API will be available at `http://127.0.0.1:8000`, and interactive API documentation can be accessed at `http://127.0.0.1`.
