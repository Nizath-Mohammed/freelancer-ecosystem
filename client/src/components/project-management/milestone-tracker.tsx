import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Plus,
  DollarSign,
  Calendar,
  User,
  MessageSquare,
  FileText,
  Upload
} from "lucide-react";
import { formatDistanceToNow, format } from "date-fns";

interface MilestoneTrackerProps {
  projectId: string;
  className?: string;
}

interface Milestone {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  budget: number;
  status: 'pending' | 'in_progress' | 'completed' | 'overdue';
  completedAt?: string;
  deliverables: string[];
  notes: string;
}

export default function MilestoneTracker({ projectId, className }: MilestoneTrackerProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedMilestone, setSelectedMilestone] = useState<Milestone | null>(null);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [newMilestone, setNewMilestone] = useState({
    title: "",
    description: "",
    dueDate: "",
    budget: 0,
    deliverables: [] as string[]
  });

  const { data: milestones, isLoading } = useQuery({
    queryKey: [`/api/projects/${projectId}/milestones`],
    queryFn: async () => {
      // Mock data for milestones
      return [
        {
          id: "ms-1",
          title: "Project Setup & Planning",
          description: "Initial project setup, requirements gathering, and technical planning",
          dueDate: "2025-01-20",
          budget: 1500,
          status: "completed" as const,
          completedAt: "2025-01-15",
          deliverables: ["Technical specifications", "Project roadmap", "Development environment"],
          notes: "Completed ahead of schedule with all requirements met."
        },
        {
          id: "ms-2",
          title: "UI/UX Design & Prototyping",
          description: "Create wireframes, mockups, and interactive prototypes",
          dueDate: "2025-01-25",
          budget: 2000,
          status: "in_progress" as const,
          deliverables: ["Wireframes", "High-fidelity mockups", "Interactive prototype"],
          notes: "Design review scheduled for tomorrow."
        },
        {
          id: "ms-3",
          title: "Frontend Development",
          description: "Implement responsive frontend components and user interface",
          dueDate: "2025-02-05",
          budget: 3500,
          status: "pending" as const,
          deliverables: ["React components", "Responsive layouts", "API integration"],
          notes: ""
        },
        {
          id: "ms-4",
          title: "Backend Development",
          description: "Build API endpoints, database schema, and server infrastructure",
          dueDate: "2025-02-10",
          budget: 4000,
          status: "pending" as const,
          deliverables: ["REST API", "Database schema", "Authentication system"],
          notes: ""
        }
      ];
    },
  });

  const createMilestoneMutation = useMutation({
    mutationFn: async (milestone: any) => {
      return apiRequest(`/api/projects/${projectId}/milestones`, {
        method: 'POST',
        body: JSON.stringify(milestone),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/projects/${projectId}/milestones`] });
      setShowCreateDialog(false);
      setNewMilestone({ title: "", description: "", dueDate: "", budget: 0, deliverables: [] });
      toast({ description: "Milestone created successfully!" });
    },
  });

  const updateMilestoneMutation = useMutation({
    mutationFn: async ({ milestoneId, updates }: { milestoneId: string; updates: any }) => {
      return apiRequest(`/api/milestones/${milestoneId}`, {
        method: 'PATCH',
        body: JSON.stringify(updates),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/projects/${projectId}/milestones`] });
      toast({ description: "Milestone updated successfully!" });
    },
  });

  const handleStatusChange = (milestoneId: string, newStatus: string) => {
    const updates: any = { status: newStatus };
    if (newStatus === 'completed') {
      updates.completedAt = new Date().toISOString();
    }
    
    updateMilestoneMutation.mutate({ milestoneId, updates });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle2 className="h-4 w-4" />;
      case 'in_progress': return <Clock className="h-4 w-4" />;
      case 'overdue': return <AlertCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const completedMilestones = milestones?.filter(m => m.status === 'completed').length || 0;
  const totalMilestones = milestones?.length || 0;
  const progressPercentage = totalMilestones > 0 ? (completedMilestones / totalMilestones) * 100 : 0;

  return (
    <div className={className}>
      {/* Project Progress Overview */}
      <Card className="enterprise-card mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <span>Project Progress</span>
              <Badge variant="outline" className="text-conectify-primary border-conectify-primary">
                {completedMilestones}/{totalMilestones} Milestones
              </Badge>
            </CardTitle>
            <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
              <DialogTrigger asChild>
                <Button className="bg-conectify-primary hover:bg-conectify-primary/90">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Milestone
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Create New Milestone</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={newMilestone.title}
                      onChange={(e) => setNewMilestone({ ...newMilestone, title: e.target.value })}
                      placeholder="Enter milestone title"
                    />
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={newMilestone.description}
                      onChange={(e) => setNewMilestone({ ...newMilestone, description: e.target.value })}
                      placeholder="Describe the milestone"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="dueDate">Due Date</Label>
                      <Input
                        id="dueDate"
                        type="date"
                        value={newMilestone.dueDate}
                        onChange={(e) => setNewMilestone({ ...newMilestone, dueDate: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="budget">Budget ($)</Label>
                      <Input
                        id="budget"
                        type="number"
                        value={newMilestone.budget}
                        onChange={(e) => setNewMilestone({ ...newMilestone, budget: Number(e.target.value) })}
                        placeholder="0"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                      Cancel
                    </Button>
                    <Button
                      onClick={() => createMilestoneMutation.mutate(newMilestone)}
                      disabled={!newMilestone.title || createMilestoneMutation.isPending}
                      className="bg-conectify-primary hover:bg-conectify-primary/90"
                    >
                      Create Milestone
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Overall Progress</span>
                <span>{Math.round(progressPercentage)}% Complete</span>
              </div>
              <Progress value={progressPercentage} className="h-3" />
            </div>
            
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-slate-50 rounded-lg">
                <div className="text-2xl font-bold text-conectify-secondary">
                  {completedMilestones}
                </div>
                <div className="text-sm text-conectify-neutral">Completed</div>
              </div>
              <div className="p-4 bg-slate-50 rounded-lg">
                <div className="text-2xl font-bold text-conectify-primary">
                  {milestones?.filter(m => m.status === 'in_progress').length || 0}
                </div>
                <div className="text-sm text-conectify-neutral">In Progress</div>
              </div>
              <div className="p-4 bg-slate-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">
                  {milestones?.filter(m => m.status === 'pending').length || 0}
                </div>
                <div className="text-sm text-conectify-neutral">Pending</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Milestones List */}
      <div className="space-y-4">
        {isLoading ? (
          [...Array(3)].map((_, i) => (
            <Card key={i} className="enterprise-card animate-pulse">
              <CardContent className="p-6">
                <div className="h-6 bg-slate-200 rounded w-1/3 mb-4"></div>
                <div className="h-4 bg-slate-200 rounded w-2/3 mb-2"></div>
                <div className="h-4 bg-slate-200 rounded w-1/2"></div>
              </CardContent>
            </Card>
          ))
        ) : (
          milestones?.map((milestone) => (
            <Card key={milestone.id} className="enterprise-card">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-conectify-secondary">
                        {milestone.title}
                      </h3>
                      <Badge className={getStatusColor(milestone.status)}>
                        {getStatusIcon(milestone.status)}
                        <span className="ml-1 capitalize">{milestone.status.replace('_', ' ')}</span>
                      </Badge>
                    </div>
                    <p className="text-conectify-neutral mb-3">
                      {milestone.description}
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-slate-400" />
                        <span className="text-sm">
                          Due {format(new Date(milestone.dueDate), 'MMM dd, yyyy')}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <DollarSign className="h-4 w-4 text-slate-400" />
                        <span className="text-sm">
                          ${milestone.budget.toLocaleString()}
                        </span>
                      </div>
                      {milestone.completedAt && (
                        <div className="flex items-center space-x-2">
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                          <span className="text-sm">
                            Completed {formatDistanceToNow(new Date(milestone.completedAt), { addSuffix: true })}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Select
                      value={milestone.status}
                      onValueChange={(value) => handleStatusChange(milestone.id, value)}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="in_progress">In Progress</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedMilestone(milestone)}
                    >
                      Details
                    </Button>
                  </div>
                </div>

                {/* Deliverables */}
                {milestone.deliverables.length > 0 && (
                  <div className="border-t pt-4">
                    <h4 className="font-medium text-conectify-secondary mb-2">Deliverables</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {milestone.deliverables.map((deliverable, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <FileText className="h-4 w-4 text-slate-400" />
                          <span className="text-sm">{deliverable}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Notes */}
                {milestone.notes && (
                  <div className="border-t pt-4 mt-4">
                    <h4 className="font-medium text-conectify-secondary mb-2">Notes</h4>
                    <p className="text-sm text-conectify-neutral">{milestone.notes}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Milestone Detail Dialog */}
      {selectedMilestone && (
        <Dialog open={!!selectedMilestone} onOpenChange={() => setSelectedMilestone(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <span>{selectedMilestone.title}</span>
                <Badge className={getStatusColor(selectedMilestone.status)}>
                  {getStatusIcon(selectedMilestone.status)}
                  <span className="ml-1 capitalize">{selectedMilestone.status.replace('_', ' ')}</span>
                </Badge>
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              <div>
                <h4 className="font-medium text-conectify-secondary mb-2">Description</h4>
                <p className="text-conectify-neutral">{selectedMilestone.description}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-conectify-secondary mb-2">Timeline</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-slate-400" />
                      <span className="text-sm">
                        Due: {format(new Date(selectedMilestone.dueDate), 'MMMM dd, yyyy')}
                      </span>
                    </div>
                    {selectedMilestone.completedAt && (
                      <div className="flex items-center space-x-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        <span className="text-sm">
                          Completed: {format(new Date(selectedMilestone.completedAt), 'MMMM dd, yyyy')}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-conectify-secondary mb-2">Budget</h4>
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-4 w-4 text-slate-400" />
                    <span className="text-2xl font-bold text-conectify-success">
                      ${selectedMilestone.budget.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-conectify-secondary mb-2">Deliverables</h4>
                <div className="space-y-2">
                  {selectedMilestone.deliverables.map((deliverable, index) => (
                    <div key={index} className="flex items-center space-x-2 p-2 bg-slate-50 rounded">
                      <FileText className="h-4 w-4 text-slate-400" />
                      <span className="text-sm">{deliverable}</span>
                    </div>
                  ))}
                </div>
              </div>

              {selectedMilestone.notes && (
                <div>
                  <h4 className="font-medium text-conectify-secondary mb-2">Notes</h4>
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <p className="text-sm text-conectify-neutral">{selectedMilestone.notes}</p>
                  </div>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}