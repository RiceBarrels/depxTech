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
import { TransitionLinkBackNav } from '@/components/client/pageTransition';

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
        <div className="flex flex-col min-h-[calc(100dvh-125px)] bg-gradient-to-br from-background via-blue-950/10 to-purple-950/10 h-screen">
            <div className='flex-1 overflow-auto px-4 py-8'>
                <div className="text-center mb-12 space-y-2">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                        GPU Details
                    </h1>
                    <p className="text-muted-foreground">Select your graphics card specifications</p>
                </div>

                <div className='flex flex-wrap items-start justify-center gap-6 max-w-7xl mx-auto'>
                    <motion.div 
                        className='relative flex flex-col rounded-xl p-6 w-full md:w-[calc(100%/3-2rem)] bg-card/50 backdrop-blur-sm border border-white/10 shadow-xl space-y-3 hover:shadow-blue-500/10 hover:border-blue-500/20 transition-all duration-300'
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="absolute -z-10 inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-xl" />
                        <p className="font-medium text-lg flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                            Chipset Manufacturer
                        </p>
                        <Select onValueChange={handleGPUChange}>
                            <SelectTrigger className="w-full bg-background/50 backdrop-blur-sm border-white/10">
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
                        <motion.div 
                            className='relative flex flex-col rounded-xl p-6 w-full md:w-[calc(100%/3-2rem)] bg-card/50 backdrop-blur-sm border border-white/10 shadow-xl space-y-3 hover:shadow-purple-500/10 hover:border-purple-500/20 transition-all duration-300'
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="absolute -z-10 inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-xl" />
                            <p className="font-medium text-lg flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                                GPU Series
                            </p>
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
                        <motion.div 
                            className='relative flex flex-col rounded-xl p-6 w-full md:w-[calc(100%/3-2rem)] bg-card/50 backdrop-blur-sm border border-white/10 shadow-xl space-y-3 hover:shadow-pink-500/10 hover:border-pink-500/20 transition-all duration-300'
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="absolute -z-10 inset-0 bg-gradient-to-br from-pink-500/5 to-red-500/5 rounded-xl" />
                            <p className="font-medium text-lg flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-pink-500"></span>
                                Specific Title of Your Model
                            </p>
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
                        <motion.div 
                            className='relative flex flex-col rounded-xl p-6 w-full md:w-[calc(100%/3-2rem)] bg-card/50 backdrop-blur-sm border border-white/10 shadow-xl space-y-3 hover:shadow-red-500/10 hover:border-red-500/20 transition-all duration-300'
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="absolute -z-10 inset-0 bg-gradient-to-br from-red-500/5 to-orange-500/5 rounded-xl" />
                            <p className="font-medium text-lg flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-red-500"></span>
                                Brand
                            </p>
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
                        <motion.div 
                            className='relative flex flex-col rounded-xl p-6 w-full md:w-[calc(100%/3-2rem)] bg-card/50 backdrop-blur-sm border border-white/10 shadow-xl space-y-3 hover:shadow-orange-500/10 hover:border-orange-500/20 transition-all duration-300'
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="absolute -z-10 inset-0 bg-gradient-to-br from-orange-500/5 to-yellow-500/5 rounded-xl" />
                            <p className="font-medium text-lg flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                                Condition
                            </p>
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
                <motion.div 
                    className='sticky bottom-0 p-4 bg-background/80 backdrop-blur-md border-t border-white/10'
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <TransitionLinkBackNav href={`gpu/${selectedGPU}/${selectedType}/${selectedModel}/${selectedBrand}/${selectedCondition}/Sell-GPU`}>
                        <Button 
                            className="w-full max-w-md mx-auto bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transition-all duration-300" 
                            size="lg"
                        >
                            Continue to Next Step
                        </Button>
                    </TransitionLinkBackNav>
                </motion.div>
            )}
        </div>
    );
}
