'use client';

import { useState } from 'react';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion";
import Link from 'next/link';

export default function GPUSelect({ data }) {
    const [selectedGPU, setSelectedGPU] = useState(null);
    const [selectedType, setSelectedType] = useState(null);
    const [selectedModel, setSelectedModel] = useState(null);
    const [selectedBrand, setSelectedBrand] = useState(null);
    const [selectedCondition, setSelectedCondition] = useState(null);

    const handleGPUChange = (value) => {
        setSelectedGPU(value);
        setSelectedType(null); // Reset selectedType when selectedGPU changes
        setSelectedModel(null); // Reset selectedModel when selectedGPU changes
        setSelectedBrand(null); // Reset selectedBrand when selectedGPU changes
        setSelectedCondition(null);
    };

    const handleTypeChange = (value) => {
        setSelectedType(value);
        setSelectedModel(null); // Reset selectedModel when selectedType changes
        setSelectedBrand(null); // Reset selectedBrand when selectedType changes
        setSelectedCondition(null);
    };

    const handleModelChange = (value) => {
        setSelectedModel(value);
        setSelectedBrand(null);
        setSelectedCondition(null);
    };

    const handleBrandChange = (value) => {
        setSelectedBrand(value);
        setSelectedCondition(null);
    }

    const handleConditionChange = (value) => {
        setSelectedCondition(value);
    }

    return (
        <div className="flex flex-col">
            <div className='h-[calc(100dvh-45px-40px-40px)] overflow-scroll'>
                <div className='flex flex-wrap items-start justify-start mt-3'>
                    <motion.div className='flex flex-col rounded-xl m-4 my-6 w-[calc(100%-2rem)] md:w-[calc(100%/3-2rem)] space-y-2 justify-center'
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 20
                        }}
                    >
                        <p>What&apos;s the Chipset? (ex: AMD)</p>
                        <Select onValueChange={handleGPUChange}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a GPU" />
                            </SelectTrigger>
                            <SelectContent className="h-[40dvh]">
                                {Object.keys(data["GPU"]).map((key) => (
                                    <SelectItem key={key} value={key}>
                                        {key}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </motion.div>
                    {selectedGPU && (
                        <motion.div className='flex flex-col rounded-xl m-4 my-6 w-[calc(100%-2rem)] md:w-[calc(100%/3-2rem)] space-y-2 justify-center'
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 20
                            }}
                        >
                            <p>What&apos;s the Series?</p>
                            <Select onValueChange={handleTypeChange}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder={"Series"} />
                                </SelectTrigger>
                                <SelectContent className="h-[40dvh]">
                                    {Object.keys(data["GPU"][selectedGPU]).map((Type,i) => (
                                        <SelectItem key={Type} value={Type}>
                                            {Type}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </motion.div>
                    )}
                    {selectedType && (
                        <motion.div className='flex flex-col rounded-xl m-4 my-6 w-[calc(100%-2rem)] md:w-[calc(100%/3-2rem)] space-y-2 justify-center'
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 20
                            }}
                        >
                            <p>What&apos;s the specific title of your model?</p>
                            <Select onValueChange={handleModelChange}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder={"Model"} />
                                </SelectTrigger>
                                <SelectContent className="h-[40dvh]">
                                    {data["GPU"][selectedGPU][selectedType].map((Model,i) => (
                                        <SelectItem key={Model} value={`${i}`}>
                                            {Model["name"]}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </motion.div>
                    )}
                    {selectedModel && (
                        <motion.div className='flex flex-col rounded-xl m-4 my-6 w-[calc(100%-2rem)] md:w-[calc(100%/3-2rem)] space-y-2 justify-center'
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 20
                            }}
                        >
                            <p>What&apos;s the brand that made this?</p>
                            <Select onValueChange={handleBrandChange}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder={"Brand"} />
                                </SelectTrigger>
                                <SelectContent className="h-[40dvh]">
                                    {data.brands.GPU[selectedGPU].map((Brand) => (
                                        <SelectItem key={Brand} value={Brand}>
                                            {Brand}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </motion.div>
                    )}
                    {selectedBrand && (
                        <motion.div className='flex flex-col rounded-xl m-4 my-6 w-[calc(100%-2rem)] md:w-[calc(100%/3-2rem)] space-y-2 justify-center'
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 20
                            }}
                        >
                            <p>What&apos;s the Condition?</p>
                            <Select onValueChange={handleConditionChange}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder={"Condition"} />
                                </SelectTrigger>
                                <SelectContent className="h-[40dvh]">
                                    <SelectItem value="Used">Used</SelectItem>
                                    <SelectItem value="New">New</SelectItem>
                                </SelectContent>
                            </Select>
                        </motion.div>
                    )}
                </div>
            </div>
            {selectedCondition && (
                <motion.div className='w-full'
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20
                    }}
                >
                    <Link href={`gpu/${selectedGPU}/${selectedType}/${selectedModel}/${selectedBrand}/${selectedCondition}`}><Button className="mx-4 w-[calc(100%-2rem)]">Next</Button></Link>
                </motion.div>
            )}
        </div>
    );
}
