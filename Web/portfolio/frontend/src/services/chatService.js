import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

// Knowledge base with structured data
const knowledgeBase = {
  about: {
    description: "I'm Prajwal Prasad, an AI Developer and Growth Engineer passionate about building innovative AI solutions. I specialize in creating intelligent systems that solve real-world problems.",
    education: "Pursuing Bachelor's in Computer Applications at Amrita Vishwa Vidyapeetham, focusing on AI and software development.",
    currentRole: "Growth Engineer at Nella Marketing, developing AI agents for lead automation and business process optimization."
  },
  skills: {
    programming: ['Python', 'JavaScript', 'Java', 'C++', 'SQL'],
    frameworks: ['React', 'Node.js', 'TensorFlow', 'PyTorch', 'Hugging Face Transformers'],
    technologies: ['RAG Systems', 'LLM Fine-tuning', 'Cloud Platforms (Azure, GCP)', 'Docker', 'Git'],
    softSkills: ['Problem Solving', 'Team Collaboration', 'Project Management', 'Communication']
  },
  projects: [
    {
      name: 'AI Meeting Summarizer',
      description: 'Automated meeting notes generation using Whisper and Hugging Face models.',
      technologies: ['Python', 'Whisper', 'Hugging Face', 'NLP'],
      impact: 'Reduced meeting documentation time by 70%'
    },
    {
      name: 'AI Voice Agent',
      description: 'Voice-enabled assistant with RAG and TTS capabilities for document search and Q&A.',
      technologies: ['Python', 'RAG', 'TTS', 'Vector DB'],
      impact: 'Enabled natural language queries across document repositories'
    },
    {
      name: 'BloodLink',
      description: 'Platform connecting blood donors with recipients in need.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Google Maps API'],
      impact: 'Facilitated over 1,000+ successful blood donations'
    }
  ],
  experience: [
    {
      role: 'Growth Engineer',
      company: 'Nella Marketing',
      duration: '2023 - Present',
      responsibilities: [
        'Develop AI agents for lead generation automation',
        'Implement RAG systems for knowledge management',
        'Optimize business processes using AI/ML'
      ]
    },
    {
      role: 'Web Developer',
      company: 'Godofon Events',
      duration: '2022 - 2023',
      responsibilities: [
        'Developed and maintained event management web applications',
        'Implemented responsive UI/UX designs',
        'Integrated third-party APIs for payment and notifications'
      ]
    }
  ]
};

const chatService = {
  sendMessage: async (message) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/chat/message`, {
        message,
        context: 'portfolio_assistant',
        knowledgeBase: true // Indicate we want structured responses
      });
      return response.data.response || generateStructuredResponse(message);
    } catch (error) {
      console.error('Chat service error:', error);
      return generateStructuredResponse(message);
    }
  }
};

const generateStructuredResponse = (message) => {
  const lowerMessage = message.toLowerCase().trim();
  
  // Intent detection with priority
  const intents = [
    {
      name: 'greeting',
      patterns: ['hi', 'hello', 'hey', 'greetings', 'good morning', 'good afternoon', 'good evening', 'howdy', "what's up", 'sup'],
      priority: 1,
      handler: handleGreeting
    },
    {
      name: 'about',
      patterns: ['who are you', 'tell me about yourself', 'introduce yourself', 'what do you do'],
      priority: 2,
      handler: handleAbout
    },
    {
      name: 'projects',
      patterns: ['project', 'built', 'created', 'developed', 'what have you built', 'show me your work'],
      priority: 2,
      handler: handleProjects
    },
    {
      name: 'skills',
      patterns: ['skill', 'technologies', 'tech stack', 'what can you do', 'what are you good at', 'expertise'],
      priority: 2,
      handler: handleSkills
    },
    {
      name: 'experience',
      patterns: ['experience', 'work', 'job', 'career', 'background', 'where have you worked'],
      priority: 2,
      handler: handleExperience
    },
    {
      name: 'contact',
      patterns: ['contact', 'get in touch', 'email', 'linkedin', 'github', 'social media'],
      priority: 2,
      handler: handleContact
    }
  ];

  // Find matching intents
  const matchedIntents = intents
    .filter(intent => intent.patterns.some(pattern => lowerMessage.includes(pattern)))
    .sort((a, b) => b.priority - a.priority);

  // Handle the highest priority intent
  if (matchedIntents.length > 0) {
    return matchedIntents[0].handler(lowerMessage);
  }

  // Default response for unknown queries
  return handleDefault();
};

// Intent Handlers
function handleGreeting() {
  const greetings = [
    `Hi there! 👋 I'm Prajwal's AI assistant. I can help you explore his professional background, projects, and skills. What would you like to know?`,
    `Hello! 😊 Thanks for stopping by. I'm here to share insights about Prajwal's work in AI and software development. What interests you?`,
    `Hey there! 👋 I'm excited to chat about Prajwal's journey in tech. Would you like to hear about his projects, skills, or experience?`
  ];
  return randomResponse(greetings);
}

function handleAbout() {
  const about = `I'm Prajwal's AI assistant! ${knowledgeBase.about.description} ${knowledgeBase.about.education} ${knowledgeBase.about.currentRole} What would you like to explore further?`;
  return about;
}

function handleProjects(query) {
  // If asking about a specific project
  const projectNames = knowledgeBase.projects.map(p => p.name.toLowerCase());
  const mentionedProject = projectNames.find(name => query.includes(name.toLowerCase()));
  
  if (mentionedProject) {
    const project = knowledgeBase.projects.find(p => p.name.toLowerCase() === mentionedProject);
    return formatProjectDetails(project);
  }
  
  // List all projects with brief descriptions
  const projectsList = knowledgeBase.projects.map(project => 
    `• ${project.name}: ${project.description} (${project.technologies.join(', ').replace(/, ([^,]*)$/, ', and $1')})`
  ).join('\n');
  
  return `Here are some of the key projects I've worked on:\n\n${projectsList}\n\nWould you like more details about any specific project?`;
}

function handleSkills() {
  const skillsText = `Here's a quick overview of my technical skills:

• Programming: ${knowledgeBase.skills.programming.join(', ')}
• Frameworks: ${knowledgeBase.skills.frameworks.join(', ')}
• Technologies: ${knowledgeBase.skills.technologies.join(', ')}
• Soft Skills: ${knowledgeBase.skills.softSkills.join(', ')}

I'm always learning and expanding my skill set. Is there a particular area you'd like to know more about?`;
  return skillsText;
}

function handleExperience() {
  const experienceText = knowledgeBase.experience.map(exp => 
    `**${exp.role} at ${exp.company} (${exp.duration})**\n` +
    exp.responsibilities.map(resp => `• ${resp}`).join('\n')
  ).join('\n\n');
  
  return `Here's a summary of my professional experience:\n\n${experienceText}\n\nWould you like more details about any of these roles?`;
}

function handleContact() {
  return `Here's how you can connect with me:\n\n` +
    `• [LinkedIn](https://www.linkedin.com/in/prjwrld/)\n` +
    `• [GitHub](https://github.com/prjwrld)\n` +
    `• [Email](mailto:logmein.edu@gmail.com)\n\n` +
    `Feel free to reach out for collaborations or just to say hi!`;
}

function handleDefault() {
  const defaultResponses = [
    "I'm not sure I fully understand. Could you rephrase that? I can tell you about Prajwal's projects, skills, or work experience.",
    "I'd love to help with that! Could you clarify if you're asking about projects, technical skills, or work experience?",
    `Hmm, I'm not certain how to respond to that. Here are some things I can help with:\n` +
    `• Projects I've worked on\n` +
    `• My technical skills and expertise\n` +
    `• My professional experience\n` +
    `• How to get in touch`
  ];
  return randomResponse(defaultResponses);
}

// Helper functions
function randomResponse(responses) {
  return responses[Math.floor(Math.random() * responses.length)];
}

function formatProjectDetails(project) {
  return `**${project.name}**\n\n` +
    `${project.description}\n\n` +
    `**Technologies Used:** ${project.technologies.join(', ').replace(/, ([^,]*)$/, ', and $1')}\n` +
    `**Impact:** ${project.impact}\n\n` +
    `Would you like to know more about this project or see some code samples?`;
}

export default chatService;