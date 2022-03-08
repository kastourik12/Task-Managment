import { EntityRepository, Repository } from "typeorm"
import { TaskDTO } from "./dto/task.dto"
import { FilterDto } from "./dto/get-filter.dto";
import { TaskStatus } from "./task-status.enum";
import { Task } from "./task.entity"
import { User } from "src/auth/user.entity";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task>{
    async createTask(taskDTO: TaskDTO,user: User) : Promise<Task>{
        const {title,description} = taskDTO;
       const task= new Task();
       task.title= title;
       task.description= description
       task.status= TaskStatus.OPEN;
       task.user = user; 
       await task.save();
      return task;
    }
    
    async getAllTasks(
        filter: FilterDto,
        user : User
        ): Promise<Task[]> {
        const {status , search} = filter;
        const query = this.createQueryBuilder('task');
    // query.where('task.userId =:userId ',{userId : user.id})
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