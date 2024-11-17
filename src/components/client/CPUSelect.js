'use client'
import { useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { motion } from "framer-motion"
import { TransitionLinkBackNav } from './pageTransition'
import { Button } from "@/components/ui/button"

export default function CPUSelect({ data }) {
    const [selectedBrand, setBrand] = useState(null)
    const [selectedSeries, setSeries] = useState(null)
    const [selectedModel, setModel] = useState(null)
    const [selectedCondition, setCondition] = useState(null)

    const handleBrandChange = (value) => {
        setBrand(value)
        setSeries(null)
        setModel(null)
        setCondition(null)
    }

    const handleSeriesChange = (value) => {
        setSeries(value)
        setModel(null)
        setCondition(null)
    }

    const handleModelChange = (value) => {
        setModel(value)
        setCondition(null)
    }

    const handleConditionChange = (value) => {
        setCondition(value)
    }

    return (
        <div className="flex flex-col min-h-[calc(100dvh-125px)] bg-gradient-to-br from-background via-blue-950/10 to-purple-950/10 h-screen">
            <div className='flex-1 overflow-auto px-4 py-8'>
                <div className="text-center mb-12 space-y-2">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                        CPU Details
                    </h1>
                    <p className="text-muted-foreground">Select your CPU specifications</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
                    <motion.div 
                        className='relative flex flex-col rounded-xl p-6 w-full bg-card/50 backdrop-blur-sm border border-white/10 shadow-xl space-y-3 hover:shadow-blue-500/10 hover:border-blue-500/20 transition-all duration-300'
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="absolute -z-10 inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-xl" />
                        <p className="font-medium text-lg flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                            Brand
                        </p>
                        <Select onValueChange={handleBrandChange}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select brand" />
                            </SelectTrigger>
                            <SelectContent>
                                {Object.keys(data.CPU).map((brand) => (
                                    <SelectItem key={brand} value={brand}>
                                        {brand}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </motion.div>

                    {selectedBrand && (
                        <motion.div 
                            className='relative flex flex-col rounded-xl p-6 w-full bg-card/50 backdrop-blur-sm border border-white/10 shadow-xl space-y-3 hover:shadow-purple-500/10 hover:border-purple-500/20 transition-all duration-300'
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="absolute -z-10 inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-xl" />
                            <p className="font-medium text-lg flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                                Series
                            </p>
                            <Select onValueChange={handleSeriesChange}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select series" />
                                </SelectTrigger>
                                <SelectContent>
                                    {Object.keys(data.CPU[selectedBrand]).map((series) => (
                                        <SelectItem key={series} value={series}>
                                            {series}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </motion.div>
                    )}

                    {selectedSeries && (
                        <motion.div 
                            className='relative flex flex-col rounded-xl p-6 w-full bg-card/50 backdrop-blur-sm border border-white/10 shadow-xl space-y-3 hover:shadow-pink-500/10 hover:border-pink-500/20 transition-all duration-300'
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="absolute -z-10 inset-0 bg-gradient-to-br from-pink-500/5 to-red-500/5 rounded-xl" />
                            <p className="font-medium text-lg flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-pink-500"></span>
                                Model
                            </p>
                            <Select onValueChange={handleModelChange}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select model" />
                                </SelectTrigger>
                                <SelectContent>
                                    {data.CPU[selectedBrand][selectedSeries].map((model, index) => (
                                        <SelectItem key={index} value={index.toString()}>
                                            {model.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </motion.div>
                    )}

                    {selectedModel && (
                        <motion.div 
                            className='relative flex flex-col rounded-xl p-6 w-full bg-card/50 backdrop-blur-sm border border-white/10 shadow-xl space-y-3 hover:shadow-orange-500/10 hover:border-orange-500/20 transition-all duration-300'
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
                                    <SelectValue placeholder="Select condition" />
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
        <TransitionLinkBackNav href={`cpu/${selectedBrand}/${selectedSeries}/${selectedModel}/${selectedCondition}/Sell-CPU`}>
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
    )
} 