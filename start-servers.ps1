# Start both backend and frontend servers
Write-Host "Starting World Books Explorer servers..."

# Start backend in background
Write-Host "Starting backend on port 3000..."
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'D:\My_Project\worldbooks-explorer\backend'; npm run start:dev"

# Wait a moment for backend to start
Start-Sleep 3

# Start frontend in background  
Write-Host "Starting frontend on port 3001..."
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'D:\My_Project\worldbooks-explorer\frontend'; npm run dev"

Write-Host "Servers starting..."
Write-Host "Backend: http://localhost:3000"
Write-Host "Frontend: http://localhost:3001/category/books"
Write-Host "Press any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")



