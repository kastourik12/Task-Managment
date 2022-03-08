import { EntityRepository, Repository } from "typeorm"
import { TaskDTO } from "./dto/task.dto"
import { FilterDto } from "./dto/get-filter.dto";
import { TaskStatus } from "./task-status.enum";
import { Task } from "./task.entity"

@EntityRepository(Task)
export class TaskRepository extends Repository<Task>{
    async createTask(taskDTO: TaskDTO) : Promise<Task>{
        const {title,description} = taskDTO;
       const saved= new Task();
       saved.title= title;
       saved.description= description
       saved.status= TaskStatus.OPEN;
       await saved.save();
      return saved;
    }
    async getAllTasks(filter: FilterDto): Promise<Task[]> {
        const {status , search} = filter;
        const query = this.createQueryBuilder('task');
        if(status){
            query.andWhere('task.status = :status',{status});
        }
        if(search){
            query.andWhere('task.title LIKE :search OR task.description LIKE :search',{search: `%${search}%`});
        }
        const tasks = query.getMany();
        return tasks;
    }
}