import aiChatImage from "@/assets/ai-chat-project.jpg";
import fitnessTrackerImage from "@/assets/fitness-tracker-project.jpg";
import ecommerceImage from "@/assets/ecommerce-project.jpg";
import reactTutorialImage from "@/assets/react-tutorial.jpg";
import mlWebappImage from "@/assets/ml-webapp-project.jpg";
import typescriptTutorialImage from "@/assets/typescript-tutorial.jpg";

export interface Project {
  id: string;
  title: string;
  description: string;
  content: string;
  image: string;
  category: string;
  date: string;
  demoUrl?: string;
  githubUrl?: string;
  type: "project" | "blog";
  author?: string;
  readTime?: string;
}

export const projects: Project[] = [
  {
    id: "ai-powered-chat",
    title: "AI-Powered Chat Application",
    description: "A modern real-time chat application with AI-powered responses, built with React, WebSocket, and OpenAI API. Features include message history, typing indicators, and intelligent conversation flow.",
    content: `# AI-Powered Chat Application

## Overview
This project demonstrates the integration of artificial intelligence into real-time communication. Built with modern web technologies, it provides users with an intuitive chat interface enhanced by AI capabilities.

## Key Features
- **Real-time messaging** with WebSocket connections
- **AI-powered responses** using OpenAI's GPT models
- **Message history** with persistent storage
- **Typing indicators** for better user experience
- **Responsive design** optimized for all devices

## Technical Implementation
The application uses React for the frontend with TypeScript for type safety. The backend is powered by Node.js with Express, implementing WebSocket connections for real-time communication. AI responses are generated using OpenAI's API with custom prompt engineering.

## Challenges & Solutions
One of the main challenges was handling the asynchronous nature of AI responses while maintaining smooth real-time communication. This was solved by implementing a queue system for AI requests and providing visual feedback to users during processing.

## Future Enhancements
- Multi-language support
- Voice message integration
- Advanced AI persona customization
- Group chat functionality`,
    image: aiChatImage,
    category: "Web Development", 
    date: "2024-01-15",
    demoUrl: "https://ai-chat-demo.com",
    githubUrl: "https://github.com/username/ai-chat",
    type: "project",
    author: "Alex Developer"
  },
  {
    id: "mobile-fitness-tracker",
    title: "Mobile Fitness Tracker",
    description: "A comprehensive fitness tracking mobile app built with React Native. Features workout logging, progress tracking, nutrition monitoring, and social features to keep users motivated.",
    content: `# Mobile Fitness Tracker

## Project Overview
The Mobile Fitness Tracker is a comprehensive health and wellness application designed to help users maintain an active lifestyle. Built with React Native, it provides a seamless experience across iOS and Android platforms.

## Core Features
- **Workout Logging**: Custom workout creation and tracking
- **Progress Analytics**: Visual charts and statistics
- **Nutrition Monitoring**: Calorie and macro tracking
- **Social Features**: Friend connections and challenges
- **Goal Setting**: Personalized fitness targets`,
    image: fitnessTrackerImage,
    category: "Mobile Apps",
    date: "2024-01-20",
    demoUrl: "https://fitness-tracker-demo.com",
    githubUrl: "https://github.com/username/fitness-tracker",
    type: "project",
    author: "Sarah Mobile"
  },
  {
    id: "e-commerce-platform",
    title: "Modern E-commerce Platform",
    description: "A full-stack e-commerce solution with advanced features like real-time inventory, payment processing, order tracking, and admin dashboard. Built with Next.js and Stripe integration.",
    content: `# Modern E-commerce Platform

## Project Description
This full-stack e-commerce platform represents a complete online shopping solution, featuring everything from product catalog management to secure payment processing.`,
    image: ecommerceImage,
    category: "Web Development",
    date: "2024-02-01",
    demoUrl: "https://ecommerce-demo.com",
    githubUrl: "https://github.com/username/ecommerce-platform",
    type: "project",
    author: "Mike Fullstack"
  },
  {
    id: "react-best-practices-2024",
    title: "React Best Practices for 2024",
    description: "An in-depth guide covering the latest React best practices, including hooks optimization, performance patterns, testing strategies, and modern development workflows.",
    content: `# React Best Practices for 2024

## Introduction
As React continues to evolve, staying updated with best practices is crucial for building maintainable and performant applications.`,
    image: reactTutorialImage,
    category: "Tutorials",
    date: "2024-02-10",
    type: "blog",
    author: "Emma React",
    readTime: "12 min read"
  },
  {
    id: "machine-learning-webapp",
    title: "Machine Learning Web Application",
    description: "A web application that demonstrates various ML algorithms through interactive visualizations. Built with Python Flask backend and React frontend, featuring model training and prediction capabilities.",
    content: `# Machine Learning Web Application

## Project Overview
This interactive web application brings machine learning concepts to life through real-time visualizations and hands-on experimentation.`,
    image: mlWebappImage,
    category: "AI & Machine Learning",
    date: "2024-02-15",
    demoUrl: "https://ml-webapp-demo.com",
    githubUrl: "https://github.com/username/ml-webapp",
    type: "project",
    author: "Dr. Data Scientist"
  },
  {
    id: "understanding-typescript",
    title: "Understanding TypeScript: A Comprehensive Guide",
    description: "Deep dive into TypeScript fundamentals, advanced types, generics, and how to leverage TypeScript for better code quality and developer experience in modern applications.",
    content: `# Understanding TypeScript: A Comprehensive Guide

## Why TypeScript?
TypeScript has become an essential tool in modern web development, providing static type checking that catches errors at compile time rather than runtime.`,
    image: typescriptTutorialImage,
    category: "Tutorials",
    date: "2024-02-20",
    type: "blog",
    author: "Tom TypeScript",
    readTime: "15 min read"
  }
];

export const getProjectById = (id: string): Project | undefined => {
  return projects.find(project => project.id === id);
};

export const getProjectsByCategory = (category: string): Project[] => {
  return projects.filter(project => project.category === category);
};

export const getProjectsByType = (type: "project" | "blog"): Project[] => {
  return projects.filter(project => project.type === type);
};

export const searchProjects = (
  searchTerm: string,
  categories: string[] = []
): Project[] => {
  return projects.filter(project => {
    const matchesSearch = !searchTerm || 
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.content.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categories.length === 0 || categories.includes(project.category);
    
    return matchesSearch && matchesCategory;
  });
};

export const getAllCategories = (): string[] => {
  return [...new Set(projects.map(project => project.category))];
};
