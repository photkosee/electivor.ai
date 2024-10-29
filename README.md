# <p align="center"><a href="https://electivor.vercel.app/">Electivor.ai</a></p>

<p align="center"> Course Recommendation Chatbot for UNSW students. <a href="https://electivor.vercel.app/">Ask Here!</a></p>

## Table of Contents
- [What this does](#what-this-does)
- [Note](#note)
- [Disclaimer](#disclaimer)
- [Built With](#built-with)
- [Author](#author)
- [Deployment](#deployment)

## What this does?

Are you feeling confused and overwhelmed by the choices you have as a UNSW student? Not knowing which course to take for your future career? This AI Chatbot is here to help. It will recommend ideal courses from your preferences. What technology you want to learn? What career are you trying to achieve?

## Note

This chatbot is a combination of a RAG model and Generative AI from Vertex AI (GCP) using Agent Builder service. By providing context (courses' outlines and information, storing them in a data store) and instruction to the AI. It is relatively easy to developed the model with the help of the service; however, the more information (larger data store for the AI to retrieve), the longer the latency. With over 100 courses currently not fully covered, a comprehensive approach isn't feasible. To optimize response time, I've categorized courses by field of study. By identifying the relevant field based on user queries, the AI only needs to retrieve information from the relevant category, rather than the entire data store. That way I can significantly reduce latency.

## Disclaimer

This website seeks to be a general tool for recommending UNSW courses to students, but its information has not been officially endorsed and is subject to change or correction. This is not official advice, and you should confirm any statements are correct before relying on it. You should confirm with official resources endorsed by UNSW and any information found here may not necessarily represent those of the School, Faculty, or University (UNSW).

Users are responsible for double-checking on the information and I have no responsibility on whether the information shown is accurate. This is a personal project and I do not represent the School, Faculty, or University (UNSW).

## Built With

- Next.js
- Tailwind CSS
- Zustand
- Clerk

## Author

Phot Koseekrainiramon
- [LinkedIn](https://www.linkedin.com/in/photkosee/)
- [GitHub](https://github.com/photkosee)

## Deployment

This project is deployed to Vercel:

https://electivor.vercel.app/
