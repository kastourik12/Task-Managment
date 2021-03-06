"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const task_repository_1 = require("./task.repository");
let TasksService = class TasksService {
    constructor(taskRepository) {
        this.taskRepository = taskRepository;
    }
    async updateTaskTitle(id, title, user) {
        const updated = await this.getTaskById(id, user);
        updated.title = title;
        return updated;
    }
    async getTaskById(id, user) {
        const found = await this.taskRepository.findOneUser(id, user);
        if (!found) {
            throw new common_1.NotFoundException(`task with ID: "${id}" is not found`);
        }
        else
            return found;
    }
    async getAllTasks(filter, user) {
        return this.taskRepository.getAllTasks(filter, user);
    }
    async createTask(taskDTO, user) {
        return this.taskRepository.createTask(taskDTO, user);
    }
    async deleteTask(id, user) {
        try {
            await this.taskRepository.deleteTask(id, user);
        }
        catch (error) {
            console.log(error.message);
            throw new common_1.NotFoundException(`task with ID:"${id}" is not found`);
        }
    }
    async updateTask(id, status, user) {
        const updated = await this.getTaskById(id, user);
        updated.status = status;
        return updated;
    }
};
TasksService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(task_repository_1.TaskRepository)),
    __metadata("design:paramtypes", [task_repository_1.TaskRepository])
], TasksService);
exports.TasksService = TasksService;
//# sourceMappingURL=tasks.service.js.map