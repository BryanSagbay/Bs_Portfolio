export interface Proyecto {
    id: number;
    tipo: 'pc' | 'movil';
    titulo: string;
    descripcion: string;
    imagenProyecto: string;
    link: string;
  }
  
  export const proyectos: Proyecto[] = [
    {
      id: 1,
      tipo: "pc",
      titulo: "Designing the future of education",
      descripcion: "Designing a platform to help educators build better online courseware.",
      imagenProyecto: "src/assets/dashboard.png",
      link: "#"
    },
    {
      id: 2,
      tipo: "movil",
      titulo: "Video game progress tracking",
      descripcion: "A mobile app to track game time and achievements with a modern UI.",
      imagenProyecto: "src/assets/movil.png",
      link: "#"
    },
    {
      id: 3,
      tipo: "pc",
      titulo: "AI Dashboard",
      descripcion: "Analytics and visualizations for AI models in a modern desktop UI.",
      imagenProyecto: "src/assets/ai.gif",
      link: "#"
    },
    {
      id: 4,
      tipo: "movil",
      titulo: "Finance Tracker",
      descripcion: "Track your daily expenses and savings easily from your phone.",
      imagenProyecto: "src/assets/example.png",
      link: "#"
    }
  ];
  