'use client'

import { useState } from 'react'
import { Plus, Skull, Trash2, Anchor, Compass, Map, BarcodeIcon as Barrel, Sword, Ship } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"

interface Task {
  id: number
  text: string
  completed: boolean
  category: string
  urgency: number
}

const categories = [
  { value: 'plunder', label: 'Plunder', icon: Anchor },
  { value: 'navigate', label: 'Navigate', icon: Compass },
  { value: 'explore', label: 'Explore', icon: Map },
  { value: 'drink', label: 'Drink', icon: Barrel },
  { value: 'fight', label: 'Fight', icon: Sword },
  { value: 'sail', label: 'Sail', icon: Ship },
]

export default function PirateTodo() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTask, setNewTask] = useState('')
  const [newCategory, setNewCategory] = useState('plunder')
  const [newUrgency, setNewUrgency] = useState(1)

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { 
        id: Date.now(), 
        text: newTask, 
        completed: false, 
        category: newCategory,
        urgency: newUrgency
      }])
      setNewTask('')
      setNewCategory('plunder')
      setNewUrgency(1)
    }
  }

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  const removeTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const getCategoryIcon = (category: string) => {
    const foundCategory = categories.find(c => c.value === category)
    return foundCategory ? foundCategory.icon : Anchor
  }

  return (
    <div className="min-h-screen bg-[url('/treasure-map.jpg')] bg-cover bg-center bg-amber-900 flex items-center justify-center px-4 py-8">
      <div className="bg-amber-100 bg-opacity-90 p-8 rounded-lg shadow-lg max-w-2xl w-full">
        <h1 className="text-4xl font-bold text-center mb-6 text-amber-900">Pirate's Plunder Planner</h1>
        <div className="flex flex-col mb-4 space-y-2">
          <Input
            type="text"
            placeholder="Add a new plunder..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="flex-grow bg-amber-50 border-amber-500 text-amber-900 placeholder-amber-700"
            onKeyPress={(e) => e.key === 'Enter' && addTask()}
          />
          <div className="flex space-x-2">
            <Select value={newCategory} onValueChange={setNewCategory}>
              <SelectTrigger className="w-[180px] bg-amber-50 border-amber-500 text-amber-900">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category.value} value={category.value}>
                    <div className="flex items-center">
                      {category.icon && <category.icon className="mr-2 h-4 w-4" />}
                      {category.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex items-center space-x-2 flex-grow">
              <Barrel className="text-amber-700" />
              <Slider
                value={[newUrgency]}
                onValueChange={(value) => setNewUrgency(value[0])}
                max={3}
                step={1}
                className="flex-grow"
              />
            </div>
            <Button onClick={addTask} className="bg-amber-500 hover:bg-amber-600 text-white">
              <Plus size={24} />
            </Button>
          </div>
        </div>
        <ul className="space-y-2">
          {tasks.map(task => {
            const CategoryIcon = getCategoryIcon(task.category)
            return (
              <li key={task.id} className="flex items-center bg-amber-200 p-3 rounded-md">
                <Checkbox
                  checked={task.completed}
                  onCheckedChange={() => toggleTask(task.id)}
                  className="border-amber-500 text-amber-500"
                />
                <CategoryIcon className="ml-2 text-amber-700" />
                <span className={`ml-3 flex-grow ${task.completed ? 'line-through text-amber-700' : 'text-amber-900'}`}>
                  {task.text}
                </span>
                <div className="flex items-center mr-2">
                  {Array.from({ length: task.urgency }).map((_, index) => (
                    <Barrel key={index} className="text-amber-700 w-4 h-4" />
                  ))}
                </div>
                <Button
                  onClick={() => removeTask(task.id)}
                  variant="ghost"
                  className="text-amber-700 hover:text-amber-900 hover:bg-amber-300"
                >
                  <Trash2 size={18} />
                </Button>
              </li>
            )
          })}
        </ul>
        {tasks.length === 0 && (
          <div className="text-center text-amber-700 mt-4">
            <Skull size={48} className="mx-auto mb-2" />
            <p>Yer list be empty, ye lazy landlubber!</p>
          </div>
        )}
      </div>
    </div>
  )
}

