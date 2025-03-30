# Component Documentation

## Common Components

### ErrorBoundary
A React error boundary component that catches JavaScript errors anywhere in the child component tree.

```jsx
<ErrorBoundary
  title="Custom Error Title"
  message="Custom error message"
  retryText="Custom retry text"
  onRetry={() => handleRetry()}
>
  <YourComponent />
</ErrorBoundary>
```

Props:
- `title` (string): Custom error title
- `message` (string): Custom error message
- `retryText` (string): Custom retry button text
- `onRetry` (function): Callback function when retry button is clicked

### Loading
A loading indicator component with different variants.

```jsx
<Loading variant="circular" />
<Loading variant="linear" />
<Loading variant="skeleton" />
```

Props:
- `variant` (string): 'circular' | 'linear' | 'skeleton'
- `size` (number): Size of the loading indicator
- `color` (string): Color of the loading indicator

### ConfirmDialog
A confirmation dialog component for user actions.

```jsx
<ConfirmDialog
  open={open}
  title="Confirm Action"
  message="Are you sure you want to proceed?"
  type="warning"
  onConfirm={() => handleConfirm()}
  onCancel={() => handleCancel()}
/>
```

Props:
- `open` (boolean): Controls dialog visibility
- `title` (string): Dialog title
- `message` (string): Dialog message
- `type` (string): 'warning' | 'info' | 'error' | 'success'
- `onConfirm` (function): Callback when confirmed
- `onCancel` (function): Callback when cancelled

### Toast
A toast notification component for showing success/error messages.

```jsx
const { showToast } = useToast();

showToast('Success message', { type: 'success' });
showToast('Error message', { type: 'error' });
showToast('Info message', { type: 'info' });
showToast('Warning message', { type: 'warning' });
```

Options:
- `type` (string): 'success' | 'error' | 'info' | 'warning'
- `duration` (number): Display duration in milliseconds
- `position` (string): Toast position on screen

## Feature Components

### InterviewErrorBoundary
Specific error boundary for interview sessions.

```jsx
<InterviewErrorBoundary onRetry={() => handleRetry()}>
  <InterviewComponent />
</InterviewErrorBoundary>
```

Props:
- `onRetry` (function): Callback when retry button is clicked

### LearningErrorBoundary
Specific error boundary for learning sessions.

```jsx
<LearningErrorBoundary onRetry={() => handleRetry()}>
  <LearningComponent />
</LearningErrorBoundary>
```

Props:
- `onRetry` (function): Callback when retry button is clicked

## Layout Components

### MainLayout
Layout component for authenticated users.

```jsx
<MainLayout>
  <Outlet />
</MainLayout>
```

Features:
- Navigation drawer
- App bar with user menu
- Responsive design
- Theme support

### AuthLayout
Layout component for unauthenticated users.

```jsx
<AuthLayout>
  <Outlet />
</AuthLayout>
```

Features:
- Simple header with navigation
- Centered content
- Footer with copyright

## Page Components

### Dashboard
Main dashboard page showing user overview.

Features:
- User statistics
- Recent activity
- Quick actions
- Progress overview

### MockInterview
Interview practice page.

Features:
- Topic selection
- Real-time interview
- Recording
- Feedback

### LearningSessions
Learning content page.

Features:
- Topic navigation
- Module content
- Progress tracking
- Interactive exercises

### CompanyPrep
Company-specific preparation page.

Features:
- Company information
- Interview questions
- Preparation tips
- Resources

### CodingPrep
Coding practice page.

Features:
- Problem selection
- Code editor
- Test cases
- Solution submission

## Best Practices

### Component Structure
- Use functional components with hooks
- Implement proper prop types
- Follow single responsibility principle
- Keep components focused and reusable

### State Management
- Use Redux for global state
- Use local state for UI-only state
- Implement proper error handling
- Handle loading states

### Performance
- Implement proper memoization
- Use lazy loading for routes
- Optimize re-renders
- Handle large lists efficiently

### Accessibility
- Use semantic HTML
- Implement ARIA attributes
- Ensure keyboard navigation
- Support screen readers

### Testing
- Write unit tests for components
- Test user interactions
- Mock external dependencies
- Test error scenarios 