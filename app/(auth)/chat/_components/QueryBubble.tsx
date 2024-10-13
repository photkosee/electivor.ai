interface QueryBubbleProps {
  text: string;
}

const QueryBubble = ({ text }: QueryBubbleProps) => {
  return (
    <div className="flex justify-end w-full">
      <div className="max-w-lg w-full bg-neutral-100 text-black px-7 py-5 break-words rounded-3xl">
        <p>{text}</p>
      </div>
    </div>
  );
};

export default QueryBubble;
