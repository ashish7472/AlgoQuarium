function CodeBlock({ code }) {
    return (
      <div className="bg-[#2c3e50] rounded-lg shadow-md p-6 border border-[#3b4a6b]  overflow-auto">
        <h3 className="text-lg font-semibold text-white mb-4">Algorithm</h3>
        <pre className="text-[#b0b8c4] text-sm whitespace-pre-wrap">
          <code>{code}</code>
        </pre>
      </div>
    );
  }
  
  export default CodeBlock;