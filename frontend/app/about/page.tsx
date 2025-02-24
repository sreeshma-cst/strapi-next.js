import Navigation from "../components/Navigation";
export default function About() {
    return (
        <div className="flex flex-col items-center justify-center text-center h-[100vh]">
            <Navigation />
            <h1 className="text-4xl font-bold mb-4">About Us</h1>
            <p>This is the about page of our application.</p>
        </div>
    );
}
