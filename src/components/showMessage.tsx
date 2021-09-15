const ShowMessage = ({ text }: { text: string }) => {
  return (
    <div className="text-5xl self-center flex-grow justify-self-center flex flex-col justify-center">
      <h1 className="mt-4 text-center">{text}</h1>
    </div>
  );
};

export default ShowMessage;
