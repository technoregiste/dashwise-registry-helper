
import React from 'react';
import { StepData } from '@/types/dashboard';
import MetricsPanel from './MetricsPanel';
import { calculateProgress } from '@/utils/progressCalculator';

interface DashboardMetricsProps {
  steps: StepData[];
  activeStepIndex?: number;
}

const DashboardMetrics: React.FC<DashboardMetricsProps> = ({ steps, activeStepIndex = 0 }) => {
  const calculateTotalCost = () => {
    let totalCost = 0;
    
    // Calculate total cost for all steps
    steps.forEach(step => {
      if (step.details?.cost) {
        const costText = step.details.cost;
        
        const matches = costText.match(/\d{1,3}(,\d{3})*(\.\d+)?/g);
        
        if (matches) {
          if (matches.length >= 2) {
            // If there's a range, use the maximum value
            const max = parseFloat(matches[1].replace(/,/g, ''));
            totalCost += max;
          } 
          else if (matches.length === 1) {
            const value = parseFloat(matches[0].replace(/,/g, ''));
            totalCost += value;
          }
        }
      }
    });
    
    // Calculate cost of completed steps
    let completedCost = 0;
    steps.filter(step => step.status === 'complete').forEach(step => {
      if (step.details?.cost) {
        const costText = step.details.cost;
        
        const matches = costText.match(/\d{1,3}(,\d{3})*(\.\d+)?/g);
        
        if (matches) {
          if (matches.length >= 2) {
            const max = parseFloat(matches[1].replace(/,/g, ''));
            completedCost += max;
          } 
          else if (matches.length === 1) {
            const value = parseFloat(matches[0].replace(/,/g, ''));
            completedCost += value;
          }
        }
      }
    });
    
    // Remaining cost
    const remainingCost = totalCost - completedCost;
    
    return `${remainingCost.toLocaleString()} دج`;
  };

  const calculateRemainingTime = () => {
    let totalDays = 0;
    
    // Calculate total time for all steps
    steps.forEach(step => {
      if (step.details?.timeframe) {
        const timeText = step.details.timeframe;
        
        if (timeText.includes('ساعة')) {
          const hours = parseInt(timeText.match(/\d+/)?.[0] || '0');
          totalDays += hours / 24;
        }
        else if (timeText.match(/(\d+)-(\d+)\s+أيام?/)) {
          const matches = timeText.match(/(\d+)-(\d+)\s+أيام?/);
          if (matches && matches.length >= 3) {
            // Use the maximum value for estimates
            totalDays += parseInt(matches[2]);
          }
        }
        else if (timeText.match(/(\d+)\s+أيام?/)) {
          const days = parseInt(timeText.match(/(\d+)/)?.[0] || '0');
          totalDays += days;
        }
      }
    });
    
    // Calculate time of completed steps
    let completedDays = 0;
    steps.filter(step => step.status === 'complete').forEach(step => {
      if (step.details?.timeframe) {
        const timeText = step.details.timeframe;
        
        if (timeText.includes('ساعة')) {
          const hours = parseInt(timeText.match(/\d+/)?.[0] || '0');
          completedDays += hours / 24;
        }
        else if (timeText.match(/(\d+)-(\d+)\s+أيام?/)) {
          const matches = timeText.match(/(\d+)-(\d+)\s+أيام?/);
          if (matches && matches.length >= 3) {
            completedDays += parseInt(matches[2]);
          }
        }
        else if (timeText.match(/(\d+)\s+أيام?/)) {
          const days = parseInt(timeText.match(/(\d+)/)?.[0] || '0');
          completedDays += days;
        }
      }
    });
    
    // Remaining days
    const remainingDays = Math.max(0, Math.ceil(totalDays - completedDays));
    
    return `${remainingDays} يوم`;
  };

  const progressPercentage = calculateProgress(steps);
  const remainingCost = calculateTotalCost();
  const remainingTime = calculateRemainingTime();

  return (
    <MetricsPanel
      completionPercentage={progressPercentage}
      estimatedTime={remainingTime}
      daysRemaining={14}
      estimatedCost={remainingCost}
    />
  );
};

export default DashboardMetrics;
