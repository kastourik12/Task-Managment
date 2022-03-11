import { EntityRepository, getConnection, Repository } from "typeorm"
import { TaskDTO } from "./dto/task.dto"
import { FilterDto } from "./dto/get-filter.dto";
import { TaskStatus } from "./task-status.enum";
import { Task } from "./task.entity"
import { User } from "src/auth/user.entity";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task>{
    async deleteTask(id: number, user: User) {
        console.log("userId:",user.id);
   await getConnection()
       .createQueryBuilder()
       .softDelete()
       .from(Task)
       .where("task.id = :id", {id })
       .andWhere("userId = :userId", {userId:user.id})
       .execute();
    }
   async findOneUser(id : number , user : User): Promise<Task> {
    const query = this.createQueryBuilder('task');
    query.where('task.id =:id ', {id});
    query.andWhere('task.userId =:userId',{userId: user.id})
    const task = query.getOne();
        return task;
    }
    async createTask(taskDTO: TaskDTO,user: User) : Promise<Task>{
        const {title,description} = taskDTO;
       const task= new Task();
       task.title= title;
       task.description= description
       task.status= TaskStatus.OPEN;
       task.user = user; 
       await task.save();
       delete task.user;
      return task;
    }
    
    async getAllTasks(
        filter: FilterDto,
        user : User
        ): Promise<Task[]> {
        const {status , search} = filter;
        const query = this.createQueryBuilder('task');
         query.where('task.userId =:userId ',{userId : user.id})
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