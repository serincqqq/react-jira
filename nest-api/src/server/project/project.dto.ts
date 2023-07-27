// 新建用户
export class CreateProjectDTO {
  readonly projectName: string;
  readonly description: string;
  readonly managerName: string;
  readonly managerEmail: string;
  readonly managerAvatar: string;
  readonly projectType: string;
  readonly keyword: string;
}

// 编辑用户
export class EditProjectDTO {
  readonly projectId: string;
  readonly projectName: string;
  readonly description: string;
  readonly managerName: string;
  readonly managerEmail: string;
  readonly managerAvatar: string;
  readonly projectType: string;
  readonly keyword: string;
}
