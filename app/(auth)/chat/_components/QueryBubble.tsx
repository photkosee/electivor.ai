interface QueryBubbleProps {
  text: string;
}

const QueryBubble = ({ text }: QueryBubbleProps) => {
  return (
    <div className="flex justify-end w-full">
      <div
        className="max-w-[220px] xs:max-w-sm sm:max-w-lg w-auto bg-neutral-100 text-black
        px-5 py-3 sm:px-7 sm:py-5 break-words rounded-3xl text-sm sm:text-base"
      >
        <p>{text}</p>
      </div>
    </div>
  );
};

export default QueryBubble;
