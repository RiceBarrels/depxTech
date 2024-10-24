import { IoIosArrowBack } from "react-icons/io";
import DepxTechLoading from "@/components/ui/depxtechLoading";
export default function(){
    <>
        <div className="backNav rounded-b-xl">
            {/* back button */}
            <div className="flex justify-center items-center pl-2"><IoIosArrowBack size={24} /> Back</div>
            <div className="flex justify-center items-center flex-1"/>
            <div className="flex justify-center items-center pl-2 opacity-0"><IoIosArrowBack size={24} /> Back</div>
        </div>
        <DepxTechLoading />
    </>
}