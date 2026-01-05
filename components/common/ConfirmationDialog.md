# ConfirmationDialog Component

A reusable confirmation dialog component with modern UI design and customizable options.

## Location
`components/common/ConfirmationDialog.tsx`

## Features
- 🎨 Modern, premium design with animations
- 🎯 Multiple dialog types (info, success, warning, danger)
- ⏳ Loading state support
- 🎭 Backdrop blur effect
- ♿ Accessible and keyboard-friendly
- 📱 Fully responsive

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isOpen` | `boolean` | - | Controls dialog visibility (required) |
| `onClose` | `() => void` | - | Callback when dialog is closed (required) |
| `onConfirm` | `() => void` | - | Callback when confirm button is clicked (required) |
| `title` | `string` | "Confirm Action" | Dialog title |
| `message` | `string` | "Are you sure you want to proceed?" | Dialog message |
| `confirmText` | `string` | "Confirm" | Confirm button text |
| `cancelText` | `string` | "Cancel" | Cancel button text |
| `type` | `"info" \| "success" \| "warning" \| "danger"` | "info" | Dialog type (affects colors and icon) |
| `isLoading` | `boolean` | `false` | Shows loading state on confirm button |

## Usage Examples

### Basic Usage (Info Dialog)
```tsx
import ConfirmationDialog from "@/components/common/ConfirmationDialog";

function MyComponent() {
  const [showDialog, setShowDialog] = React.useState(false);

  const handleConfirm = () => {
    // Your confirmation logic here
    console.log("Confirmed!");
    setShowDialog(false);
  };

  return (
    <>
      <button onClick={() => setShowDialog(true)}>
        Show Dialog
      </button>

      <ConfirmationDialog
        isOpen={showDialog}
        onClose={() => setShowDialog(false)}
        onConfirm={handleConfirm}
        title="Confirm Action"
        message="Are you sure you want to proceed with this action?"
      />
    </>
  );
}
```

### Success Dialog (Save Changes)
```tsx
<ConfirmationDialog
  isOpen={showConfirmation}
  onClose={() => setShowConfirmation(false)}
  onConfirm={handleSave}
  title="Save Changes"
  message="Are you sure you want to save all the changes made to this page?"
  confirmText="Save Changes"
  cancelText="Cancel"
  type="success"
  isLoading={isSaving}
/>
```

### Warning Dialog
```tsx
<ConfirmationDialog
  isOpen={showWarning}
  onClose={() => setShowWarning(false)}
  onConfirm={handleProceed}
  title="Warning"
  message="This action may have unintended consequences. Please review before proceeding."
  confirmText="Proceed Anyway"
  cancelText="Go Back"
  type="warning"
/>
```

### Danger Dialog (Delete Action)
```tsx
<ConfirmationDialog
  isOpen={showDelete}
  onClose={() => setShowDelete(false)}
  onConfirm={handleDelete}
  title="Delete Item"
  message="This action cannot be undone. Are you sure you want to delete this item permanently?"
  confirmText="Delete"
  cancelText="Cancel"
  type="danger"
  isLoading={isDeleting}
/>
```

### With Async Operations
```tsx
function MyComponent() {
  const [showDialog, setShowDialog] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      await saveDataToServer();
      toast.success("Saved successfully!");
      setShowDialog(false);
    } catch (error) {
      toast.error("Failed to save");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ConfirmationDialog
      isOpen={showDialog}
      onClose={() => setShowDialog(false)}
      onConfirm={handleConfirm}
      title="Save Changes"
      message="Save your changes?"
      type="success"
      isLoading={isLoading}
    />
  );
}
```

## Dialog Types and Their Visual Styles

### Info (Default)
- **Icon**: Info circle
- **Color**: Blue
- **Use case**: General confirmations, information

### Success
- **Icon**: Check circle
- **Color**: Green
- **Use case**: Save actions, successful operations

### Warning
- **Icon**: Alert triangle
- **Color**: Yellow
- **Use case**: Caution messages, potentially risky actions

### Danger
- **Icon**: Alert circle
- **Color**: Red
- **Use case**: Delete actions, destructive operations

## Implementation in AboutPage

See `app/about/page.tsx` for a complete implementation example with:
- State management for dialog visibility
- Integration with save functionality
- Loading state handling
- Toast notifications on success

## Best Practices

1. **Always provide meaningful titles and messages** - Help users understand what they're confirming
2. **Use appropriate dialog types** - Match the visual style to the action's severity
3. **Handle loading states** - Disable interactions during async operations
4. **Provide clear button labels** - Use action-specific text instead of generic "OK"
5. **Close dialog after successful operations** - Reset state properly
6. **Consider user experience** - Don't overuse confirmations for trivial actions
