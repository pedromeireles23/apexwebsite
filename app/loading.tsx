const loading = () => {
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <svg
        viewBox="0 0 48 48"
        className="w-32 h-32 relative"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* CAMADA ESTÁTICA OPACA */}
        <polygon
          points="24 20.039 32.714 35.303 26.75 35.303 37.08 42.391 42.5 38.013 
      24 5.609 5.5 38.013 10.92 42.391 21.25 35.303 15.286 35.303 24 20.039"
          className="base-line"
        />

        {/* CAMADA ANIMADA */}
        <polygon
          points="24 20.039 32.714 35.303 26.75 35.303 37.08 42.391 42.5 38.013 
      24 5.609 5.5 38.013 10.92 42.391 21.25 35.303 15.286 35.303 24 20.039"
          className="draw-neon-loop"
        />
      </svg>
    </div>
  );
};

export default loading;
