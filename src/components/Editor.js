import React, { useState, useEffect} from 'react';
import MonacoEditor from 'react-monaco-editor';
import './Editor.css'; 

const languageOptions = [
  { label: 'JavaScript', value: 'javascript' },
  { label: 'Python', value: 'python' },
  { label: 'Java', value: 'java' },
  { label: 'C++', value: 'cpp' },
  
];

function Editor() {
    const [selectedLanguage, setSelectedLanguage] = useState('javascript');

    const handleLanguageChange = (e) => {
        setSelectedLanguage(e.target.value);
    };

    const editorDidMount = (editor, monaco) => {
        console.log('editorDidMount', editor);
        editor.focus();
    };

    const onChange = (newValue, e) => {
        console.log('onChange', newValue, e);
    };

    useEffect(() => {
        // Load language support dynamically
        async function loadLanguage() {
        const monaco = await import('monaco-editor');

        if (selectedLanguage === 'javascript') {
            await import('monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution');
        } else if (selectedLanguage === 'python') {
            await import('monaco-editor/esm/vs/basic-languages/python/python.contribution');
        } else if (selectedLanguage === 'java') {
            await import('monaco-editor/esm/vs/basic-languages/java/java.contribution');
        } else if (selectedLanguage === 'cpp') {
            await import('monaco-editor/esm/vs/basic-languages/cpp/cpp.contribution');
        }

        monaco.editor.defineTheme('myCustomTheme', {
            base: 'vs-dark',
            inherit: true,
            rules: [{ background: 'EDF2F7' }],
            colors: { 'editor.background': '#EDF2F7' },
        });

        monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
            allowNonTsExtensions: true,
            target: monaco.languages.typescript.ScriptTarget.ES5,
        });

        monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
            noSemanticValidation: false,
            noSyntaxValidation: false
        });
        }

        loadLanguage();

        return () => {
        };
    }, [selectedLanguage]);

    return (
        <div className="editor-container">
            <div className="language-selector">
                <h3>Select Language:</h3>
                <select value={selectedLanguage} onChange={handleLanguageChange}>
                {languageOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                ))}
                </select>
            </div>
            <div className="code-editor">
                <h2>Code Editor</h2>
                <MonacoEditor
                width="100%"
                height="600"
                language={selectedLanguage}
                theme="vs-dark"
                defaultValue="// Start coding here..."
                editorDidMount={editorDidMount}
                onChange={onChange}
                />
            </div>
        </div>
    );
}

export default Editor;