export * from './<%= typesResolve %>';
<% if (containerResolve) { -%>export { default as <%= container %> } from './<%= containerResolve %>';<% } %>
<% if (providerResolve) { -%>export * from './<%= providerResolve %>';<% } %>
export { default as <%= renderer %> } from './<%= rendererResolve %>';
