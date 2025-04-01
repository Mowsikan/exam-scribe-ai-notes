
import { Note, NoteLength } from '@/types/Note';

// Mock API service (would be replaced with actual backend calls)
export const generateNotes = async (query: string, length: NoteLength): Promise<Note> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Simulate response based on query and length
  const id = Math.random().toString(36).substring(2, 11);
  
  // Mock examples for quick development
  const mockExamples: Record<string, Partial<Note>> = {
    'newton': {
      title: "Newton's Laws of Motion",
      definition: "Newton's Laws of Motion are three physical laws that form the foundation for classical mechanics, describing the relationship between the motion of an object and the forces acting on it.",
      formula: "F = ma (Force equals mass times acceleration)",
      diagram: "https://cdn.britannica.com/36/147636-050-D0B80639/motion-First-law-object-rest-velocity-magnitude.jpg",
      keyPoints: [
        "First Law (Inertia): An object at rest stays at rest, and an object in motion stays in motion unless acted upon by an external force.",
        "Second Law (F=ma): The acceleration of an object is directly proportional to the force applied and inversely proportional to its mass.",
        "Third Law: For every action, there is an equal and opposite reaction.",
        "These laws apply to macroscopic objects under normal conditions.",
        "At quantum scales or extremely high speeds, these laws need to be modified."
      ]
    },
    'mitosis': {
      title: "Mitosis: Cell Division Process",
      definition: "Mitosis is a process of cell division in which one cell divides into two identical daughter cells, each containing the same number of chromosomes as the parent cell.",
      keyPoints: [
        "Mitosis consists of four main phases: prophase, metaphase, anaphase, and telophase.",
        "During prophase, chromosomes condense and the nuclear envelope breaks down.",
        "In metaphase, chromosomes align at the cell's equator.",
        "Anaphase involves the separation of sister chromatids toward opposite poles.",
        "Telophase is when nuclear envelopes form around the new sets of chromosomes.",
        "Cytokinesis (division of the cytoplasm) typically occurs alongside telophase."
      ],
      diagram: "https://cdn.britannica.com/54/126854-050-5DD011B1/cell-cells-reproduction-process-mitosis.jpg"
    },
    'photosynthesis': {
      title: "Photosynthesis: Converting Light to Chemical Energy",
      definition: "Photosynthesis is the process by which green plants, algae, and some bacteria convert light energy into chemical energy, using carbon dioxide and water to produce glucose and oxygen.",
      formula: "6CO₂ + 6H₂O + Light Energy → C₆H₁₂O₆ + 6O₂",
      keyPoints: [
        "Takes place primarily in the chloroplasts of plant cells.",
        "Consists of light-dependent reactions and the Calvin cycle (light-independent reactions).",
        "Chlorophyll is the primary pigment that absorbs light energy.",
        "The light-dependent reactions produce ATP and NADPH.",
        "The Calvin cycle uses ATP and NADPH to fix carbon dioxide into glucose.",
        "Factors affecting photosynthesis include light intensity, carbon dioxide concentration, and temperature."
      ]
    },
    'python': {
      title: "Python Programming Language",
      definition: "Python is a high-level, interpreted programming language known for its readability, simplicity, and versatility, making it popular for web development, data analysis, artificial intelligence, and scientific computing.",
      keyPoints: [
        "Python uses indentation (whitespace) to define code blocks, unlike braces in other languages.",
        "Python's philosophy emphasizes code readability with its clean, simple syntax.",
        "Python is dynamically typed, meaning variable types are determined at runtime.",
        "Key data structures include lists, dictionaries, tuples, and sets.",
        "Python supports multiple programming paradigms, including procedural, object-oriented, and functional programming.",
        "The Python Package Index (PyPI) hosts thousands of third-party modules for Python."
      ],
      formula: "def greet(name):\n    return f\"Hello, {name}!\""
    }
  };
  
  // Check if we have a mock for this query
  const mockMatch = Object.keys(mockExamples).find(key => 
    query.toLowerCase().includes(key)
  );
  
  let mockData = mockMatch ? mockExamples[mockMatch] : null;
  
  // If no mock found, create a generic response
  if (!mockData) {
    mockData = {
      title: query,
      definition: `This is a generated definition for "${query}" that would explain the concept in a clear, concise manner suitable for exam preparation.`,
      keyPoints: [
        `The first key point about ${query} that's important for exams.`,
        `The second key point about ${query} with additional details.`,
        `Another important aspect of ${query} that often appears in exams.`,
        `A common misconception about ${query} that should be avoided.`,
        `How ${query} relates to other important concepts in this subject.`
      ]
    };
  }
  
  // Adjust content based on requested length
  const adjustedKeyPoints = mockData.keyPoints || [];
  const pointsToInclude = length === 'small' ? 3 : length === 'medium' ? 5 : 7;
  
  // Create the complete note
  return {
    id,
    title: mockData.title || query,
    definition: mockData.definition || '',
    formula: mockData.formula,
    diagram: mockData.diagram,
    keyPoints: adjustedKeyPoints.slice(0, pointsToInclude),
    length,
    createdAt: new Date().toISOString(),
    source: ['OpenLibrary.org', 'Google Books API']
  };
};

// Save note to "backend"
export const saveNote = async (note: Note): Promise<Note> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // In a real app, this would save to a database
  // For now, we'll simulate successful save by returning the note
  console.log('Note saved:', note);
  return note;
};

// Get saved notes from "backend"
export const getNotes = async (): Promise<Note[]> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // In a real app, this would fetch from a database
  // For now, return mock data
  return [];
};
