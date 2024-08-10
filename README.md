# Upnyx Backend Assignment
This repository consists the assignment for Senior Python Developer Position at Zentratech.

## Project Description
Develop a minimal full-stack chat application which will allow users to send interest messages to other users. The recipient can then accept or reject the interest, and if accepted, both users can chat with each other. The project is being made by Django as Backend , React as Frontend and Postgresqk as Database . The Core Features of this app are -

- **User Authentication** - A simple Session based User authentication is implemented here where users can register and log in. The REST API being used for this purpose -  *http://127.0.0.1:8000/api/register* & *http://127.0.0.1:8000/api/auth/login*

- **Sending Interests & Accepting/Rejecting Interests** - After being logged in , the user can see other available users on the system and send request to them .  The REST API responsible for this purpose is - *http://127.0.0.1:8000/api/request (POST)* . An user can also see whose friend requests has come to his profile. The REST API responsible for this purpose is - *http://127.0.0.1:8000/api/request (GET)*

- **Chat System** - When an user accepts the friend request of another user then they are eligible to chat via *WebSocket Protocol*. The Socket API being used for this purpose is - *ws://127.0.0.1:8000/ws/chat*


## Architechture
 ![Architechture](https://pbs.twimg.com/media/GUnJ-mhWgAEKHui?format=png&name=large)

## Pre-requisites and Installation
### Environment Setup
- Create a Virtualenv ```venv```
```bash
python3 -m venv venv
```
- Activate Virtualenv ```venv``` (Linux)
```bash
source venv/bin/activate
```
- Activate Virtualenv ```venv``` (Windows)
```bash
.\venv\Scripts\activate
```
### Libraries

**Frontend**
- vite-react(Typescript enabled) (18.3.1)
- Node.js Runtime (20.16.0)

**Backend**
- Django (5.0.7)
- Django REST Framework (3.15.2)
- Django-cors-headers (4.4.0)
- Psycopg3 (psycopg[binary,pool] - 3.2.1)
- Pytest (8.3.2) and Pytest-django (0.23.8)
- daphne (4.1.2)
- Channels (Django Channels) (4.1.0)


```bash
pip install django djangorestframework psycopg[binary,pool] pytest pytest-django channels["daphne"]
```
Or you can clone the repo and directly install the **requirements.txt**

```bash
git clone https://github.com/PARTHIB-DEB/Zentratech-Chat-App.git

pip install -r requirements.txt
```

## Pre-requisites and Installation
This is a *cross-platform application* which means its *frontend* and *backend* has individual servers and they communicate with each other by CORS (Cross-Origin Resource Sharing) policies. Also , if anyone runs this app in *Linux Based Distros* , he/she also has to start the *Postgresql server* manually. So the steps to run this application are - 

### Start the ```React``` Server -
I am assuming that you have installed *node.js* before running this application. If not , then install it.

```bash
cd Frontend

npm i

npm run dev
```

### Create *zentra* Database in ```postgresql```

Install postgresql from its official site and follow my Tutorial - [link](https://github.com/PARTHIB-DEB/Django-PostgreSQL-Integration)

### Run ```postgresql``` server (For Linux Distros Only)

```bash
sudo systemctl start postgresql
```
OR

```bash
sudo service postgresql start
```

### Migrate all changes and run ```Django``` Server

```bash
cd Backend
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```

## Challenges

- **CORS Setup** : As this is a cross-platform application so it necessary to have CORS setup between react and django server. Based on different HTTP METHODS this connection changes with the presence of different HTTP headers.
So I faced many exceptions like Typeerror or request forbidden to create this bridge

- **WebSocket Implementation** : Websockets are such protocols which are used in real-time communication means its an event-driven protocol where the events are happenning spontenously. A websocket is the just the connection which connects users and their data is handled by consumers. So I faced few exceptions here also.

## Suggestions

Its my first time to build a *full stack cross-platform chat app*. I was planning to make one such chat app with a different architechture - but then I got this opportunity 😀. I have learned many things from this task but , there are still some exceptions and erros 😔 which may need some 1 or 2 week more to resolve but guess what - I have no time (also my on-campus recruitment will start soon). But I tried my best to organise things and hit the target . Rest is in your hands 👍
