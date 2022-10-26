import {createRoot} from 'react-dom/client';

const App = () => {
    
    return (

        <main>
            <h1>Hello</h1>
            <p>This is my new app.</p>
        </main>
    
    )
}

const root = createRoot(document.getElementById('app'));
root.render(<App />);