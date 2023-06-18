FROM python:3.10.12-alpine3.18
WORKDIR /speaker
COPY . .
RUN pip install --no-cache-dir --upgrade -r requirements.txt
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "80"]