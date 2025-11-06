
interface FloatTextProps {
    message: string;
}
export function FloatText({
    message,
}: FloatTextProps){

    return (
      <div className="relative grid h-full grid-cols-1 grid-rows-3 gap-4">
        <h1 className="col-span-1 row-span-1 font-bold">Your Group ID:</h1>
        <h1 className="col-span-1 row-span-1">{message}</h1>
        <h1 className="col-span-1 row-span-1 text-sm font-semibold">Please remember this ID</h1>
      </div>
    );
}