"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label"

export function User() {
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
  const [statistics, setStatistics] = useState({
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
    totalHours: 0,
  })
  const [userProfile, setUserProfile] = useState({
    skillLevel: "beginner",
    workHoursAvailable: 0,
    minWage: 0,
  })
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("YOUR_API_URL")
        const data = await response.json()
        setStatistics(data.statistics)
        setUserProfile(data.userProfile)
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }
    fetchData()
  }, [])
  const [selectedTask, setSelectedTask] = useState(null)
  const handleViewTask = (task) => {
    setSelectedTask(task)
  }
  const [isUpdateProfileOpen, setIsUpdateProfileOpen] = useState(false)
  const handleUpdateUserProfile = (field, value) => {
    setUserProfile({ ...userProfile, [field]: value })
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
              className="flex items-center gap-1 rounded-full bg-muted px-3 py-1 text-sm font-medium text-muted-foreground">
              <UserIcon className="h-4 w-4" />
              <span>User</span>
            </div>
            <Button variant="ghost" size="icon" className="rounded-full">
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
              <h1 className="text-2xl font-bold">Alloted Tasks</h1>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {tasks.map((task, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
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
                      </div>
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
          </div>
          <div>
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">User Profile</h1>
              <Button onClick={() => setIsUpdateProfileOpen(true)}>
                <FilePenIcon className="mr-2 h-4 w-4" />
                Update Profile
              </Button>
            </div>
            <div className="mt-6 grid gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Expertise Level</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={userProfile.skillLevel === "Beginner" ? "secondary" : ""}
                      onClick={() => handleUpdateUserProfile("skillLevel", "Beginner")}>
                      Beginner
                    </Badge>
                    <Badge
                      variant={userProfile.skillLevel === "Intermediate" ? "primary" : ""}
                      onClick={() => handleUpdateUserProfile("skillLevel", "Intermediate")}>
                      Intermediate
                    </Badge>
                    <Badge
                      variant={userProfile.skillLevel === "Advanced" ? "success" : ""}
                      onClick={() => handleUpdateUserProfile("skillLevel", "Advanced")}>
                      Advanced
                    </Badge>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Work Hours Available</CardTitle>
                </CardHeader>
                <CardContent>
                  <Input
                    type="number"
                    value={userProfile.workHoursAvailable}
                    onChange={(e) => handleUpdateUserProfile("workHoursAvailable", e.target.value)} />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Minimum Wage</CardTitle>
                </CardHeader>
                <CardContent>
                  <Input
                    type="number"
                    value={userProfile.minWage}
                    onChange={(e) => handleUpdateUserProfile("minWage", e.target.value)} />
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
                <div className="flex items-center gap-2">
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
                </div>
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
      <Dialog
        open={isUpdateProfileOpen}
        onOpenChange={(open) => setIsUpdateProfileOpen(open)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Update User Profile</DialogTitle>
          </DialogHeader>
          <div>
            <form className="grid gap-4">
              <div className="grid gap-1">
                <Label htmlFor="skill-level">Skill Level</Label>
                <div className="flex items-center gap-2">
                  <Badge
                    variant={userProfile.skillLevel === "Beginner" ? "secondary" : ""}
                    onClick={() => handleUpdateUserProfile("skillLevel", "Beginner")}>
                    Beginner
                  </Badge>
                  <Badge
                    variant={userProfile.skillLevel === "Intermediate" ? "primary" : ""}
                    onClick={() => handleUpdateUserProfile("skillLevel", "Intermediate")}>
                    Intermediate
                  </Badge>
                  <Badge
                    variant={userProfile.skillLevel === "Advanced" ? "success" : ""}
                    onClick={() => handleUpdateUserProfile("skillLevel", "Advanced")}>
                    Advanced
                  </Badge>
                </div>
              </div>
              <div className="grid gap-1">
                <Label htmlFor="work-hours">Work Hours Available</Label>
                <Input
                  id="work-hours"
                  type="number"
                  value={userProfile.workHoursAvailable}
                  onChange={(e) => handleUpdateUserProfile("workHoursAvailable", e.target.value)} />
              </div>
              <div className="grid gap-1">
                <Label htmlFor="minimum-wage">Minimum Wage</Label>
                <Input
                  id="minimum-wage"
                  type="number"
                  value={userProfile.minWage}
                  onChange={(e) => handleUpdateUserProfile("minWage", e.target.value)} />
              </div>
            </form>
          </div>
          <DialogFooter>
            <div>
              <Button variant="ghost">Cancel</Button>
            </div>
            <Button type="submit" onClick={() => setIsUpdateProfileOpen(false)}>
              Update Profile
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


function FilePenIcon(props) {
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
      <path d="M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v10" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10.4 12.6a2 2 0 1 1 3 3L8 21l-4 1 1-4Z" />
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
