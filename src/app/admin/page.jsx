"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem } from "@/components/ui/select"
import { getUserAccount, getAdmin, getContract } from "@/lib/connection"

export default function Page() {
  const [tasks, setTasks] = useState([
    {
      title: "Design Landing Page",
      skillLevel: "Beginner",
      estimatedHours: 4,
      wage: 15,
      deadline: "2023-06-30",
      description: "Design a modern and responsive landing page for the company website.",
    },
    {
      title: "Develop API Endpoints",
      skillLevel: "Intermediate",
      estimatedHours: 8,
      wage: 25,
      deadline: "2023-07-15",
      description: "Implement RESTful API endpoints for the backend services.",
    },
    {
      title: "Implement Authentication",
      skillLevel: "Advanced",
      estimatedHours: 12,
      wage: 35,
      deadline: "2023-08-01",
      description: "Integrate a secure authentication system with social login options.",
    },
    {
      title: "Write Documentation",
      skillLevel: "Beginner",
      estimatedHours: 2,
      wage: 20,
      deadline: "2023-06-15",
      description:
        "Create comprehensive documentation for the project, including user guides and technical specifications.",
    },
  ])
  const [onChainCost, setOnChainCost] = useState(0)
  const [statistics, setStatistics] = useState({
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
    totalHours: 0,
    totalWage: 0,
  })

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userAccount = await getUserAccount();
        const adminAccount = await getAdmin();
        console.log(adminAccount);
        if (userAccount !== adminAccount) {
          router.push('/user');
        }
      } catch (error) {
        console.error("Error fetching accounts:", error)
      }
    }
    fetchData();
  }, [router])
  const handleAddTask = (task) => {
    setTasks([...tasks, task])
  }
  const [selectedTask, setSelectedTask] = useState(null)
  const handleViewTask = (task) => {
    setSelectedTask(task)
  }
  const [newTask, setNewTask] = useState({
    title: "",
    skillLevel: "beginner",
    estimatedHours: 0,
    wage: 0,
    deadline: "",
    description: "",
  })
  const handleNewTaskChange = (field, value) => {
    setNewTask({ ...newTask, [field]: value })
  }
  const handleSaveTask = () => {
    handleAddTask(newTask)
    setNewTask({
      title: "",
      skillLevel: "beginner",
      estimatedHours: 0,
      wage: 0,
      deadline: "",
      description: "",
    })
    setIsAddTaskOpen(false)
  }
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false)
  const [visibleTasks, setVisibleTasks] = useState(4)
  const handleViewMore = () => {
    setVisibleTasks(tasks.length)
  }
  return (
    (<div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-40 w-full border-b bg-background">
        <div
          className="container flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link
            href="#"
            className="flex items-center gap-2 text-lg font-semibold"
            prefetch={false}>
            <ClipboardListIcon className="h-6 w-6" />
            <span className="sr-only">Task Manager</span>
          </Link>
          <div className="flex items-center gap-4">
            <div
              className="flex items-center gap-1 rounded-md bg-muted px-3 py-1 text-sm font-medium text-muted-foreground">
              <UserIcon className="h-4 w-4" />
              <span>Admin</span>
            </div>
            <Button variant="ghost" size="icon" className="rounded-lg">
              <BellIcon className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
            </Button>
          </div>
        </div>
      </header>
      <main className="container flex-1 py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">Tasks</h1>
              <Button onClick={() => setIsAddTaskOpen(true)}>
                <PlusIcon className="mr-2 h-4 w-4" />
                Add Task
              </Button>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {tasks.slice(0, visibleTasks).map((task, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <Badge
                        variant={
                          task.skillLevel === "Beginner"
                            ? "secondary"
                            : task.skillLevel === "Intermediate"
                              ? "primary"
                              : "success"
                        }>
                        {task.skillLevel}
                      </Badge>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <ClockIcon className="h-4 w-4" />
                        <span>{task.estimatedHours} hrs</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="grid gap-2">
                    <div className="text-lg font-medium">{task.title}</div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <DollarSignIcon className="h-4 w-4" />
                        <span>${task.wage}/hr</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <CalendarIcon className="h-4 w-4" />
                        <span>{task.deadline}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm" onClick={() => handleViewTask(task)}>
                      View Task
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            {tasks.length > 4 && (
              <div className="mt-4 flex justify-center">
                <Button variant="outline" onClick={handleViewMore}>
                  View More
                </Button>
              </div>
            )}
          </div>
          <div>
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            </div>
            <div className="mt-6 grid gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>On-Chain Cost</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold">${onChainCost.toFixed(2)}</div>
                </CardContent>
              </Card>
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Total Tasks</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-4xl font-bold">{statistics.totalTasks}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Completed Tasks</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-4xl font-bold">{statistics.completedTasks}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Pending Tasks</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-4xl font-bold">{statistics.pendingTasks}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Total Hours</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-4xl font-bold">{statistics.totalHours}</div>
                  </CardContent>
                </Card>
              </div>
              <Card>
                <CardHeader>
                  <CardTitle>Total Wage</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold">${statistics.totalWage.toFixed(2)}</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Dialog
        open={selectedTask !== null}
        onOpenChange={(open) => setSelectedTask(open ? selectedTask : null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{selectedTask?.title}</DialogTitle>
          </DialogHeader>
          <div>
            <div className="grid gap-4">
              <div className="flex items-center justify-between">
                <Badge
                  variant={
                    selectedTask?.skillLevel === "Beginner"
                      ? "secondary"
                      : selectedTask?.skillLevel === "Intermediate"
                        ? "primary"
                        : "success"
                  }>
                  {selectedTask?.skillLevel}
                </Badge>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <ClockIcon className="h-4 w-4" />
                  <span>{selectedTask?.estimatedHours} hrs</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <DollarSignIcon className="h-4 w-4" />
                  <span>${selectedTask?.wage}/hr</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <CalendarIcon className="h-4 w-4" />
                  <span>{selectedTask?.deadline}</span>
                </div>
              </div>
              <div className="text-sm text-muted-foreground">{selectedTask?.description}</div>
            </div>
          </div>
          <DialogFooter>
            <div>
              <Button variant="ghost">Close</Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog open={isAddTaskOpen} onOpenChange={(open) => setIsAddTaskOpen(open)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Task</DialogTitle>
          </DialogHeader>
          <div>
            <form className="grid gap-4">
              <div className="grid gap-1">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="Enter task title"
                  value={newTask.title}
                  onChange={(e) => handleNewTaskChange("title", e.target.value)} />
              </div>
              <div className="grid gap-1">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Enter task description"
                  value={newTask.description}
                  onChange={(e) => handleNewTaskChange("description", e.target.value)} />
              </div>
              <div className="grid gap-1">
                <Label htmlFor="skill-level">Skill Level</Label>
                <Select
                  id="skill-level"
                  value={newTask.skillLevel}
                  onValueChange={(e) => handleNewTaskChange("skillLevel", e.target.value)}>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-1">
                <Label htmlFor="estimated-hours">Estimated Hours</Label>
                <Input
                  id="estimated-hours"
                  type="number"
                  placeholder="Enter estimated hours"
                  value={newTask.estimatedHours}
                  onChange={(e) => handleNewTaskChange("estimatedHours", Number(e.target.value))} />
              </div>
              <div className="grid gap-1">
                <Label htmlFor="minimum-wage">Minimum Wage</Label>
                <Input
                  id="minimum-wage"
                  type="number"
                  placeholder="Enter minimum wage"
                  value={newTask.wage}
                  onChange={(e) => handleNewTaskChange("wage", Number(e.target.value))} />
              </div>
              <div className="grid gap-1">
                <Label htmlFor="deadline">Deadline</Label>
                <Input
                  id="deadline"
                  type="date"
                  value={newTask.deadline}
                  onChange={(e) => handleNewTaskChange("deadline", e.target.value)} />
              </div>
            </form>
          </div>
          <DialogFooter>
            <div>
              <Button variant="ghost">Cancel</Button>
            </div>
            <Button type="submit" onClick={handleSaveTask}>
              Save Task
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>)
  );
}

function BellIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>)
  );
}


function CalendarIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>)
  );
}


function ClipboardListIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
      <path
        d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <path d="M12 11h4" />
      <path d="M12 16h4" />
      <path d="M8 11h.01" />
      <path d="M8 16h.01" />
    </svg>)
  );
}


function ClockIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>)
  );
}


function DollarSignIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <line x1="12" x2="12" y1="2" y2="22" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>)
  );
}


function PlusIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>)
  );
}


function UserIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>)
  );
}
