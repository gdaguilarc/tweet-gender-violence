FROM ubuntu:latest as base

RUN apt-get update

FROM base as builder

RUN apt-get -y install python3.8 python3-pip gcc musl-dev python3-dev g++ libffi-dev openssl make libtool

RUN mkdir /install

WORKDIR /install

ADD requirements.txt /install/requirements.txt

RUN pip3 install -r requirements.txt

ADD . /app

WORKDIR /app

EXPOSE 8080

CMD ["python3", "app.py"]
