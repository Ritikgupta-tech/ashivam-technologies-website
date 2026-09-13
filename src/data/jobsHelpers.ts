import { jobs, type Job } from '@/data/jobs';

export const getJobBySlug = (slug: string): Job | undefined => jobs.find((job) => job.slug === slug);
