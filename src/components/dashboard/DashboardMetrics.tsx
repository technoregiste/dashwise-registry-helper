
import React from 'react';
import { StepData } from '@/types/dashboard';
import MetricsPanel from './MetricsPanel';

interface DashboardMetricsProps {
  steps: StepData[];
}

const DashboardMetrics: React.FC<DashboardMetricsProps> = ({ steps }) => {
  const calculateProgress = () => {
    if (steps.length === 0) return 0;
    
    const total = steps.length;
    const completed = steps.filter(step => step.status === 'complete').length;
    const inProgress = steps.filter(step => step.status === 'progress').length * 0.5;
    
    let progressPoints = 0;
    steps.filter(step => step.status === 'progress').forEach(step => {
      if (step.details?.documents && step.details.documents.length > 0) {
        const totalDocs = step.details.documents.length;
        const checkedDocs = step.details.documents.filter(doc => doc.checked).length;
        progressPoints += (checkedDocs / totalDocs) * 0.25 / total;
      }
      
      if (step.details?.checklistItems && step.details.checklistItems.length > 0) {
        const totalItems = step.details.checklistItems.length;
        const checkedItems = step.details.checklistItems.filter(item => item.checked).length;
        progressPoints += (checkedItems / totalItems) * 0.25 / total;
      }
    });
    
    return Math.round(((completed + inProgress + progressPoints) / total) * 100);
  };

  const calculateTotalCost = () => {
    let totalMin = 0;
    let totalMax = 0;
    
    steps.forEach(step => {
      if (step.details?.cost) {
        const costText = step.details.cost;
        
        const matches = costText.match(/\d{1,3}(,\d{3})*(\.\d+)?/g);
        
        if (matches) {
          if (matches.length >= 2) {
            const min = parseFloat(matches[0].replace(/,/g, ''));
            const max = parseFloat(matches[1].replace(/,/g, ''));
            totalMin += min;
            totalMax += max;
          } 
          else if (matches.length === 1) {
            const value = parseFloat(matches[0].replace(/,/g, ''));
            totalMin += value;
            totalMax += value;
          }
        }
      }
    });
    
    if (totalMin === totalMax) {
      return `${totalMin.toLocaleString()} دج`;
    } else {
      return `${totalMin.toLocaleString()} - ${totalMax.toLocaleString()} دج`;
    }
  };

  const calculateTotalTime = () => {
    let minDays = 0;
    let maxDays = 0;
    
    steps.forEach(step => {
      if (step.details?.timeframe) {
        const timeText = step.details.timeframe;
        
        if (timeText.includes('ساعة')) {
          const hours = parseInt(timeText.match(/\d+/)?.[0] || '0');
          minDays += hours / 24;
          maxDays += hours / 24;
        }
        else if (timeText.match(/(\d+)-(\d+)\s+أيام?/)) {
          const matches = timeText.match(/(\d+)-(\d+)\s+أيام?/);
          if (matches && matches.length >= 3) {
            minDays += parseInt(matches[1]);
            maxDays += parseInt(matches[2]);
          }
        }
        else if (timeText.match(/(\d+)\s+أيام?/)) {
          const days = parseInt(timeText.match(/(\d+)/)?.[0] || '0');
          minDays += days;
          maxDays += days;
        }
      }
    });
    
    const minDaysRounded = Math.ceil(minDays);
    const maxDaysRounded = Math.ceil(maxDays);
    
    if (minDaysRounded === maxDaysRounded) {
      return `${minDaysRounded} يوم`;
    } else {
      return `${minDaysRounded} - ${maxDaysRounded} يوم`;
    }
  };

  const progressPercentage = calculateProgress();
  const estimatedCost = calculateTotalCost();
  const estimatedTime = calculateTotalTime();

  return (
    <MetricsPanel
      completionPercentage={progressPercentage}
      estimatedTime={estimatedTime}
      daysRemaining={14}
      estimatedCost={estimatedCost}
    />
  );
};

export default DashboardMetrics;
