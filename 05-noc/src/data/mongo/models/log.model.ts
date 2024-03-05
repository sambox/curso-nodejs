import mongoose from "mongoose";
import { LogSeverityLevel } from "../../../domain/entities/log.entity";

/**
 public level: LogSeverityLevel;
  public message: string;
  public createdAt: Date;
  public origin: string;
 */

const logSchema = new mongoose.Schema({
  level: { 
    type: String, 
    enum: ['low', 'medium', 'high'], 
    default: 'low' 
  },
  message: {
    type: String,
    required: true
  },
  createdAt: { 
    type: Date, 
    default: new Date() 
  },
  origin: { 
    type: String 
  }
});

export const LogModel = mongoose.model('Log', logSchema);
