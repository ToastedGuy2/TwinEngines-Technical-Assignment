export default function CenterContainer({ bgColor, bgImage, children }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        minWidth: "100vw",
        backgroundColor: bgColor,
        backgroundImage: bgImage,
      }}
    >
      {children}
    </div>
  );
}
