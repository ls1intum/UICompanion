import {MockupProgress} from "../enums/MockupProgress";

export const mockupProgressToIndex: Record<MockupProgress, number> = {
  [MockupProgress.OPEN]: 0,
  [MockupProgress.IN_PROGRESS]: 1,
  [MockupProgress.IN_REVIEW]: 2,
  [MockupProgress.APPROVED]: 3,
};
