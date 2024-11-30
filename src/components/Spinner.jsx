import { Spinner } from "@material-tailwind/react";
export function SpinnerColors() {
    return (
        <div className="fixed flex items-center justify-center z-50 inset-0 backdrop-blur-[2px]">
            <Spinner color="green" className="h-16 w-16"/>
        </div>
    );
}