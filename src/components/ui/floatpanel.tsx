interface FloatPanelProps{
    component: React.ReactNode;
}
export default function FloatPanel({
    component
} : FloatPanelProps){
    return(
        <div className="absolute h-60 w-40 bg-white border-2 rounded-2xl top-1/2 left-1/2">
            {component}
        </div>

    );
}