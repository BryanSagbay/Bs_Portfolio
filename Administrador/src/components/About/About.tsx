export default function About() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-4xl font-bold mb-4">Sobre Nosotros</h1>
            <p className="text-lg text-gray-700 mb-8">
                Somos un equipo dedicado a brindar las mejores soluciones tecnológicas.
            </p>
            <img src="/path/to/image.jpg" alt="Imagen de ejemplo" className="w-1/2 rounded-lg shadow-lg" />
        </div>
    );
}