"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskRepository = void 0;
const typeorm_1 = require("typeorm");
const task_status_enum_1 = require("./task-status.enum");
const task_entity_1 = require("./task.entity");
let TaskRepository = class TaskRepository extends typeorm_1.Repository {
    async deleteTask(id, user) {
        console.log("userId:", user.id);
        await (0, typeorm_1.getConnection)()
            .createQueryBuilder()
            .softDelete()
            .from(task_entity_1.Task)
            .where("task.id = :id", { id })
            .andWhere("userId = :userId", { userId: user.id })
            .execute();
    }
    async findOneUser(id, user) {
        const query = this.createQueryBuilder('task');
        query.where('task.id =:id ', { id });
        query.andWhere('task.userId =:userId', { userId: user.id });
        const task = query.getOne();
        return task;
    }
    async createTask(taskDTO, user) {
        const { title, description } = taskDTO;
        const task = new task_entity_1.Task();
        task.title = title;
        task.description = description;
        task.status = task_status_enum_1.TaskStatus.OPEN;
        task.user = user;
        await task.save();
        delete task.user;
        return task;
    }
    async getAllTasks(filter, user) {
        const { status, search } = filter;
        const query = this.createQueryBuilder('task');
        query.where('task.userId =:userId ', { userId: user.id });
        if (status) {
            query.andWhere('task.status = :status', { status });
        }
        if (search) {
            query.andWhere('task.title LIKE :search OR task.description LIKE :search', { search: `%${search}%` });
        }
        const tasks = query.getMany();
        return tasks;
    }
};
TaskRepository = __decorate([
    (0, typeorm_1.EntityRepository)(task_entity_1.Task)
], TaskRepository);
exports.TaskRepository = TaskRepository;
//# sourceMappingURL=task.repository.js.map