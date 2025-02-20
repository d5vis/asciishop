const Title = () => {
  const asciiArt = `       
  __ _ ___ __(_|_)__| |_  ___ _ __ 
 / _\` (_-</ _| | (_-< ' \\/ _ \\ '_ \\
 \\__,_/__/\\__|_|_/__/_||_\\___/ .__/
                             |_|   
  `;

  return (
    <h1 className="text-[8px]">
      <pre>{asciiArt}</pre>
    </h1>
  );
};

export default Title;
