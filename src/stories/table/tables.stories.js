import { createTables } from './tables';

export default {
  title: 'Components/Tables',
  render: ({ label, striped, ...args}) => {
    return createTables({ label, striped, ...args });
  },
  component: createTables,
  tags: ['component'],
  argTypes: {
    label: { control: 'text' },
    striped: { control: 'boolean' },
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/EM5KcfOyqRBsPTRkbvT5Kn/Component-Assembly-Design-System?node-id=39-184&m=dev',
    },
  },
};

export const Default = {
  args: {
    label: 'Default',
    striped: false,
  },
};

export const Striped = () => {
  return `
    <div class="container-fluid table-responsive-lg">
      <table class="table table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">Plans</th>
            <th scope="col">Project</th>
            <th scope="col">Budget hours</th>
            <th scope="col">Equated hours</th>
            <th scope="col">Actual hours</th>
            <th scope="col">Delta hours</th>
            <th scope="col"># Days</th>
            <th scope="col">% Complete</th>
            <th scope="col">% Update</th>
            <th scope="col">Times updated</th>
            <th scope="col">Budget updated</th>
          </tr>
        </thead>
        <tbody>
        <tr>
          <th scope="row">
            <a href="https://componentassemblysystems.github.io/casWOW/plans">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-easel" viewBox="0 0 16 16">
                <path d="M8 0a.5.5 0 0 1 .473.337L9.046 2H14a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-1.85l1.323 3.837a.5.5 0 1 1-.946.326L11.092 11H8.5v3a.5.5 0 0 1-1 0v-3H4.908l-1.435 4.163a.5.5 0 1 1-.946-.326L3.85 11H2a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h4.954L7.527.337A.5.5 0 0 1 8 0M2 3v7h12V3z"/>
              </svg>
            </a>
          </th>
          <td>
            <span class="badge rounded-pill text-bg-info">717</span> <a href="">Mandalore Palace</a>
          </td>
          <td>186,455</td>
          <td>186,455</td>
          <td>179,252</td>
          <td>
            <span class="text-neutral">7,203</span>
          </td>
          <td>856</td>
          <td>
            <div class="progress" role="progressbar" aria-label="Example with label" aria-valuenow="85" aria-valuemin="0" aria-valuemax="100">
              <div class="progress-bar bg-primary" style="width: 85%">85</div>
            </div>
          </td>
          <td>03/08/2024</td>
          <td>21</td>
          <td>08/24/2024</td>
        </tr>
        <tr>
          <th scope="row">
            <a href="https://componentassemblysystems.github.io/casWOW/plans">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-easel" viewBox="0 0 16 16">
                <path d="M8 0a.5.5 0 0 1 .473.337L9.046 2H14a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-1.85l1.323 3.837a.5.5 0 1 1-.946.326L11.092 11H8.5v3a.5.5 0 0 1-1 0v-3H4.908l-1.435 4.163a.5.5 0 1 1-.946-.326L3.85 11H2a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h4.954L7.527.337A.5.5 0 0 1 8 0M2 3v7h12V3z"/>
              </svg>
            </a>
          </th>
          <td>
            <span class="badge rounded-pill text-bg-info">717</span> <a href="">Mandalore Palace</a>
          </td>
          <td>186,455</td>
          <td>186,455</td>
          <td>179,252</td>
          <td>
            <span class="text-neutral">7,203</span>
          </td>
          <td>856</td>
          <td>
            <div class="progress" role="progressbar" aria-label="Example with label" aria-valuenow="85" aria-valuemin="0" aria-valuemax="100">
              <div class="progress-bar bg-primary" style="width: 85%">85</div>
            </div>
          </td>
          <td>03/08/2024</td>
          <td>21</td>
          <td>08/24/2024</td>
        </tr>
        <tr>
          <th scope="row">
            <a href="https://componentassemblysystems.github.io/casWOW/plans">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-easel" viewBox="0 0 16 16">
                <path d="M8 0a.5.5 0 0 1 .473.337L9.046 2H14a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-1.85l1.323 3.837a.5.5 0 1 1-.946.326L11.092 11H8.5v3a.5.5 0 0 1-1 0v-3H4.908l-1.435 4.163a.5.5 0 1 1-.946-.326L3.85 11H2a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h4.954L7.527.337A.5.5 0 0 1 8 0M2 3v7h12V3z"/>
              </svg>
            </a>
          </th>
          <td>
            <span class="badge rounded-pill text-bg-info">717</span> <a href="">Mandalore Palace</a>
          </td>
          <td>186,455</td>
          <td>186,455</td>
          <td>179,252</td>
          <td>
            <span class="text-neutral">7,203</span>
          </td>
          <td>856</td>
          <td>
            <div class="progress" role="progressbar" aria-label="Example with label" aria-valuenow="85" aria-valuemin="0" aria-valuemax="100">
              <div class="progress-bar bg-primary" style="width: 85%">85</div>
            </div>
          </td>
          <td>03/08/2024</td>
          <td>21</td>
          <td>08/24/2024</td>
        </tr>
        <tr>
          <th scope="row">
            <a href="https://componentassemblysystems.github.io/casWOW/plans">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-easel" viewBox="0 0 16 16">
                <path d="M8 0a.5.5 0 0 1 .473.337L9.046 2H14a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-1.85l1.323 3.837a.5.5 0 1 1-.946.326L11.092 11H8.5v3a.5.5 0 0 1-1 0v-3H4.908l-1.435 4.163a.5.5 0 1 1-.946-.326L3.85 11H2a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h4.954L7.527.337A.5.5 0 0 1 8 0M2 3v7h12V3z"/>
              </svg>
            </a>
          </th>
          <td>
            <span class="badge rounded-pill text-bg-info">717</span> <a href="">Mandalore Palace</a>
          </td>
          <td>186,455</td>
          <td>186,455</td>
          <td>179,252</td>
          <td>
            <span class="text-neutral">7,203</span>
          </td>
          <td>856</td>
          <td>
            <div class="progress" role="progressbar" aria-label="Example with label" aria-valuenow="85" aria-valuemin="0" aria-valuemax="100">
              <div class="progress-bar bg-primary" style="width: 85%">85</div>
            </div>
          </td>
          <td>03/08/2024</td>
          <td>21</td>
          <td>08/24/2024</td>
        </tr>
      </tbody>
    </table>
  `
};
