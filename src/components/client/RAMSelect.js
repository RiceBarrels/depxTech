'use client'

import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { TransitionLinkBackNav } from "@/components/client/pageTransition";

export default function RAMSelect({ data }) {
    const [selectedType, setType] = useState(null); // DDR5
    const [selectedCapacity, setCapacity] = useState(null); // 8GB, 16GB, etc.
    const [selectedSpeed, setSpeed] = useState(null); // 4800Mhz, etc.
    const [selectedBrand, setBrand] = useState(null);
    const [selectedCondition, setCondition] = useState(null);

    const handleTypeChange = (value) => {
        setType(value);
        setCapacity(null);
        setSpeed(null);
        setBrand(null);
        setCondition(null);
    };

    const handleCapacityChange = (value) => {
        setCapacity(value);
        setSpeed(null);
        setBrand(null);
        setCondition(null);
    };

    const handleSpeedChange = (value) => {
        setSpeed(value);
        setBrand(null);
        setCondition(null);
    };

    const handleBrandChange = (value) => {
        setBrand(value);
        setCondition(null);
    };

    const handleConditionChange = (value) => {
        setCondition(value);
    };

    return (
        <div className="flex flex-col min-h-[calc(100dvh-125px)] bg-gradient-to-br from-background via-blue-950/10 to-purple-950/10">
            <div className='flex-1 overflow-auto px-4 py-8'>
                <div className="text-center mb-12 space-y-2">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                        RAM Details
                    </h1>
                    <p className="text-muted-foreground">Select your RAM specifications</p>
                </div>

                <div className='flex flex-wrap items-start justify-center gap-6 max-w-7xl mx-auto'>
                    {/* Type Selection */}
                    <motion.div 
                        className='relative flex flex-col rounded-xl p-6 w-full md:w-[calc(100%/3-2rem)] bg-card/50 backdrop-blur-sm border border-white/10 shadow-xl space-y-3 hover:shadow-blue-500/10 hover:border-blue-500/20 transition-all duration-300'
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="absolute -z-10 inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-xl" />
                        <p className="font-medium text-lg flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                            Type
                        </p>
                        <Select onValueChange={handleTypeChange}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select RAM Type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="DDR5">DDR5</SelectItem>
                            </SelectContent>
                        </Select>
                    </motion.div>

                    {/* Capacity Selection */}
                    {selectedType && (
                        <motion.div 
                            className='relative flex flex-col rounded-xl p-6 w-full md:w-[calc(100%/3-2rem)] bg-card/50 backdrop-blur-sm border border-white/10 shadow-xl space-y-3 hover:shadow-green-500/10 hover:border-green-500/20 transition-all duration-300'
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="absolute -z-10 inset-0 bg-gradient-to-br from-green-500/5 to-blue-500/5 rounded-xl" />
                            <p className="font-medium text-lg flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                                Capacity
                            </p>
                            <Select onValueChange={handleCapacityChange}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select Capacity" />
                                </SelectTrigger>
                                <SelectContent>
                                    {Object.keys(data.RAM.DDR5).map((capacity) => (
                                        <SelectItem key={capacity} value={capacity}>
                                            {capacity}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </motion.div>
                    )}

                    {/* Speed Selection */}
                    {selectedCapacity && (
                        <motion.div 
                            className='relative flex flex-col rounded-xl p-6 w-full md:w-[calc(100%/3-2rem)] bg-card/50 backdrop-blur-sm border border-white/10 shadow-xl space-y-3 hover:shadow-purple-500/10 hover:border-purple-500/20 transition-all duration-300'
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="absolute -z-10 inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-xl" />
                            <p className="font-medium text-lg flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                                Speed
                            </p>
                            <Select onValueChange={handleSpeedChange}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select Speed" />
                                </SelectTrigger>
                                <SelectContent>
                                    {Object.keys(data.RAM.DDR5[selectedCapacity]).map((speed) => (
                                        <SelectItem key={speed} value={speed}>
                                            {data.RAM.DDR5[selectedCapacity][speed].name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </motion.div>
                    )}

                    {/* Brand Selection */}
                    {selectedSpeed && (
                        <motion.div 
                            className='relative flex flex-col rounded-xl p-6 w-full md:w-[calc(100%/3-2rem)] bg-card/50 backdrop-blur-sm border border-white/10 shadow-xl space-y-3 hover:shadow-pink-500/10 hover:border-pink-500/20 transition-all duration-300'
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="absolute -z-10 inset-0 bg-gradient-to-br from-pink-500/5 to-red-500/5 rounded-xl" />
                            <p className="font-medium text-lg flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-pink-500"></span>
                                Brand
                            </p>
                            <Select onValueChange={handleBrandChange}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select Brand" />
                                </SelectTrigger>
                                <SelectContent>
                                    {Object.keys(data.brands.RAM[selectedType]).map((brand) => (
                                        <SelectItem key={data.brands.RAM[selectedType][brand]} value={data.brands.RAM[selectedType][brand]}>
                                            {data.brands.RAM[selectedType][brand]}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </motion.div>
                    )}

                    {/* Condition Selection */}
                    {selectedBrand && (
                        <motion.div 
                            className='relative flex flex-col rounded-xl p-6 w-full md:w-[calc(100%/3-2rem)] bg-card/50 backdrop-blur-sm border border-white/10 shadow-xl space-y-3 hover:shadow-yellow-500/10 hover:border-yellow-500/20 transition-all duration-300'
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="absolute -z-10 inset-0 bg-gradient-to-br from-yellow-500/5 to-orange-500/5 rounded-xl" />
                            <p className="font-medium text-lg flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                                Condition
                            </p>
                            <Select onValueChange={handleConditionChange}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select Condition" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="New">New</SelectItem>
                                    <SelectItem value="Used">Used</SelectItem>
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
                    <TransitionLinkBackNav href={`ram/${selectedType}/${selectedSpeed}/${selectedCapacity}/${selectedBrand}/${selectedCondition}/Sell-RAM`}>
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